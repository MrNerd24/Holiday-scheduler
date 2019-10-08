export interface RGBColor {
    r: number;
    g: number;
    b: number
}

export const  colorSlide = (color1: RGBColor, color2: RGBColor, weight: number) => {
    const w1 = weight;
    const w2 = 1 - w1;
    const rgb = {
        r: Math.round(color1.r * w2 + color2.r * w1),
        g: Math.round(color1.g * w2 + color2.g * w1),
        b: Math.round(color1.b * w2 + color2.b * w1)
    };
    return rgb;
}

export const RGBColorToString = (color: RGBColor, alpha: number = 1) => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
}