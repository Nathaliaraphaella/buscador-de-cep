import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "./src/services/api";

export default function App() {
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  async function buscarCep() {
    const dados = await api({ method: "get", url: `${cep}/json` });
    console.log(dados.data);
    setRua(dados.data.logradouro);
    setBairro(dados.data.bairro);
    setCidade(dados.data.localidade);
  }
  return (
    <View style={styles.container}>
      <Text>Buscador</Text>
      <TextInput
        placeholder="Ex: 34523-009"
        type="text"
        keyboardType="numeric"
        value={cep}
        onChangeText={(texto) => setCep(texto)}
      />
      <TouchableOpacity onPress={buscarCep}>
        <Text>Buscar</Text>
      </TouchableOpacity>

      <Text>{rua}</Text>
      <Text>{bairro}</Text>
      <Text>{cidade}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
