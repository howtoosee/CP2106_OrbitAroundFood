import {Dimensions, PixelRatio, Platform} from 'react-native';


const {width, height} = Dimensions.get('window');
const scale = width / 400;


function normalise(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}


const Fonts = {
    XL: normalise(34),
    L: normalise(26),
    M: normalise(19),
    S: normalise(16),
    XS: normalise(14),
    SPECIAL: normalise(22),
}


export default Fonts;
