import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, val) => {
    try {
        await AsyncStorage.setItem(key, val)
    } catch (e) {
      // saving error
    }

    console.log('Set Data Success')
}

export const getData = (key) => {

    return AsyncStorage.getItem(key)
        .then((val) => {
            return JSON.parse(val)
        }).catch((e) => {
            console.log('error get')
        })

    console.log('Get Data Success')

}

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
        return true
    } catch (e) {
        return false
    }

    console.log('Remove Data Success')
}
