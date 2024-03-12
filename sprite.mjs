class Sprite {
    static folder = "";
    static totalSprites = 0;
    static loadedSprites = 0;
    constructor(path) {
        path ?? console.error("Cannot create sprite without path to image");
        this.texture = new Image();
        this.texture.src = Sprite.folder + "/" + path;
        Sprite.totalSprites++
        this.texture.addEventListener("load", e => {
            Sprite.loadedSprites++
            console.log(`Loaded ${path}. ${Sprite.loadedSprites} / ${Sprite.totalSprites}`)
            if (Sprite.loadedSprites == Sprite.totalSprites) {
                console.debug('loaded all sprites')
            }
        })
    }
}