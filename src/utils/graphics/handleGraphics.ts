
export const addGraphics = (graphicLayer: __esri.GraphicsLayer, graphics: __esri.Graphic[]) => {
    if (!graphicLayer || graphics.length === 0) return;
    if (graphics.length === 1) {
        graphicLayer.graphics.add(graphics[0])
    } else {
        graphicLayer.graphics.addMany(graphics)
    }
};

export const removeGraphics = (graphicLayer: __esri.GraphicsLayer, graphics: __esri.Graphic[]) => {
    if (!graphicLayer || graphics.length === 0) return;
    if (graphics.length === 1) {
        graphicLayer.graphics.remove(graphics[0])
    } else {
        graphicLayer.graphics.removeMany(graphics)
    }
};

export const removeAllGraphics = (graphicLayer: __esri.GraphicsLayer) => {
    if (!graphicLayer) return;

    graphicLayer.graphics.removeAll();
};