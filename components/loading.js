import { Dimensions, View } from "react-native";
import { tailwind } from "react-native-tailwindcss";
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');

const LoadingComponent = () => {
    return (
        <View style={[{ height: height, width: width }, tailwind.absolute, tailwind.flexRow, tailwind.justifyCenter, tailwind.itemsCenter]}>
            <Progress.CircleSnail thickness={12} size={160} color='orange' />
        </View>
    );

}


export default LoadingComponent;