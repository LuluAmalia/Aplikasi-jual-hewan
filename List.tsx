import {View, Text, FlatList, StyleSheet} from "react-native";

export default function List() {
    const data = [
        {nama: "Lulu Cantik Banget", age: 20, city: "Jepang"},
        {nama: "Nur Alam Banget", age: 29, city: "Korea"},
        {nama: "Sinta", age: 21, city: "Jepang"},
        {nama: "Devi", age: 20, city: "Jepang"},
        {nama: "Somad", age: 19, city: "Arab Saudi"},
        {nama: "Naufal", age: 15, city: "Hongkong"},
        {nama: "Ramadhan", age: 10, city: "Malaysia"},
        {nama: "Andre", age: 20, city: "China"},
        {nama: "Riki", age: 27, city: "Indonesia"}
    ];
    type DataItem = {nama: string; age: number; city: string};
    const renderItem = ({item}: {item: DataItem}) => {
        return (
            <View style={styless.item}>
                <Text style={styless.text}>{item.nama}</Text>
                <Text style={styless.text}>{item.age}</Text>
                <Text style={styless.text}>{item.city}</Text>
            </View>
        );
    };

    return (
        <View style={styless.container}>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item: { nama: any; }) => item.nama}
            />
        </View>
    );
}
const styless = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#cccc",
    },
    text: {
        fontSize: 20,
        fontStyle: "italic",
    },
});