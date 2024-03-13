import { Camera } from "./camera.mjs";
import { Edge } from "./edge.mjs";
import { Graph } from "./graph.mjs";
import { Input } from "./input.mjs";
import { Node } from "./node.mjs";
import { Vector } from "./vector.mjs";
enum States {
  default,
  panning,
  dragging,
  paused,
}
class App {
  static pause = false;

  static cursor = new Vector();

  static lastClickHandled = true;
  static potentialConnectionToggle = false;

  static state = States.default;

  static unstaged: { edges: Edge[]; nodes: Node[] } = { edges: [], nodes: [] };

  static menu: Element;

  static canvas: HTMLCanvasElement;

  static placeFromUnstaged() {
    const nextNode: Node | undefined = App.unstaged.nodes.shift();
    if (nextNode) {
      nextNode.pos.setFrom(Graph.getCenterOfMass().add(Vector.random()));
      Graph.nodes.push(nextNode);
      const nextEdges = App.unstaged.edges.filter(
        (e) => e.node1.id === nextNode.id || e.node2.id === nextNode.id
      );
      nextEdges.forEach((nextEdge) => {
        if (
          Graph.nodes.indexOf(nextEdge.node1) >= 0 &&
          Graph.nodes.indexOf(nextEdge.node2) >= 0
        ) {
          Graph.edges.push(nextEdge);
          App.unstaged.edges.splice(App.unstaged.edges.indexOf(nextEdge), 1);
        }
      });
    }
    App.updateMenu();
  }

  static updateCursor() {
    App.cursor.setFrom(
      Input.pointer.add(Camera.pos.add(Camera.shift)).scale(1 / Camera.scale)
    );
  }

  static update(lag: number) {
    if (!App.lastClickHandled) {
      App.lastClickHandled = true;
      if (App.pause) {
        console.log("TODO: Skipping in pause");
        return;
      }
      if (Graph.hovered && Graph.hovered.checkCollision(App.cursor)) {
        if (Graph.selected) console.log("Unreachable");
        Graph.select(Graph.hovered);
        Graph.hovered = null;
        Graph.selectedOriginalPos.setFrom(Graph.selected!.pos);
        App.canvas.classList.add("dragging")
      } else {
        if (Graph.selected) {
          Graph.selected.color = "orange";
          Graph.selected = null;
        }
        App.canvas.classList.add("moving")
      }
    }
    if (Input.downState) {
      if (Graph.selected) {
        Graph.selected.pos.setFrom(App.cursor.add(Graph.selectedShift));
        App.potentialConnectionToggle = Graph.hovered !== null;
      } else {
        Camera.updateShift();
      }
    } else {
      if (Graph.hovered) {
        if (!App.canvas.classList.contains("hovering")) {
            App.canvas.classList.add("hovering")
        }
      } else {
        if (App.canvas.classList.contains("hovering")) {
            App.canvas.classList.remove("hovering")
        }
      }
    }
  }

  static applyShift() {
    if (Graph.selected) {
      Graph.deselect();
      App.canvas.classList.remove("dragging")
    } else {
      Camera.applyShift();
      App.canvas.classList.remove("moving")
    }
  }

  static connectOveralpped() {
    if (Graph.selected && Graph.hovered && Graph.selected != Graph.hovered) {
      const existingEgde = Graph.edges.find(
        (e) =>
          (e.node1.id === Graph.selected!.id &&
            e.node2.id === Graph.hovered!.id) ||
          (e.node1.id === Graph.hovered!.id &&
            e.node2.id === Graph.selected!.id)
      );
      if (existingEgde) {
        Graph.edges.splice(Graph.edges.indexOf(existingEgde), 1);
      } else {
        Graph.edges.push(new Edge(Graph.selected, Graph.hovered));
      }
      Graph.selected.pos.setFrom(Graph.selectedOriginalPos);
    }
  }

  static updateMenu() {
    while (App.menu.firstChild) {
      App.menu.removeChild(App.menu.firstChild);
    }
    App.unstaged.nodes.slice(0, 50).forEach((node, i) => {
      const menuItem = document.createElement("li");
      menuItem.innerText =
        (i == 0 ? "(" : "") + node.label + (i == 0 ? ")" : "");
      App.menu.appendChild(menuItem);
    });
    App.unstaged.edges.slice(0, 50).forEach((edge) => {
      const menuItem = document.createElement("li");
      menuItem.innerText = String(edge);
      App.menu.appendChild(menuItem);
    });
  }
}
export { App };
