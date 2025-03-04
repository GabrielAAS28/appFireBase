import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db, auth } from './firebaseConnections';
import { doc, getDoc, onSnapshot, setDoc, collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { UserList } from './users'
import { signOut } from 'firebase/auth'

export function FormUsers() {

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cargo, setCargo] = useState("");

  const [users, setUsers] = useState([]);


  const [showForm, setShowFrom] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function getDados() {
      const usersRef = collection(db, "users");

      onSnapshot(usersRef, (snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            cargo: doc.data().cargo,
          });
        });
        setUsers(lista);
      }, (error) => {
        console.error("Erro ao buscar dados: ", error);
      });
    }

    getDados();
  }, []);

  async function handleRegister() {
    await addDoc(collection(db, "users"), {
      nome: nome,
      idade: idade,
      cargo: cargo
    })
      .then(() => {
        console.log("Cadastrado com sucesso")
        setNome("")
        setCargo("")
        setIdade("")
      })
      .catch((err) => {
        console.log(err)
      })

  }

  function handleToggle() {
    setShowFrom(!showForm);
  }


  function editUser(user) {
    setNome(user.nome)
    setIdade(user.idade)
    setCargo(user.cargo)
    setIsEditing(user.id)
  }

  async function handleEditUser() {
    const docRef = doc(db, "users", isEditing)
    await updateDoc(docRef, {
      nome: nome,
      idade: idade,
      cargo: cargo,
    })
      .then(() => {
        console.log("Alterado com sucesso")
        setNome("")
        setCargo("")
        setIdade("")
        setIsEditing("")
      })
      .catch((err) => {
        console.log(err)
      })

  }
  async function handleLogout(params) {
    await signOut(auth);
  }

  return (
    <View style={styles.container}>
      {showForm && (
        <View>
          <Text style={styles.lable}> Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite seu nome...'
            value={nome}
            onChangeText={(text) => setNome(text)}

          />

          <Text style={styles.lable}> Idade:</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite sua idade...'
            value={idade}
            onChangeText={(text) => setIdade(text)}

          />
          <Text style={styles.lable}> Cargo:</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite o seu cargo..'
            value={cargo}
            onChangeText={(text) => setCargo(text)}

          />

          {isEditing !== "" ? (
            <TouchableOpacity style={styles.button} onPress={handleEditUser}>
              <Text style={styles.buttonText}>Editar Dados</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Adicionar Dados</Text>
            </TouchableOpacity>
          )}
        </View>

      )}


      <TouchableOpacity onPress={handleToggle} style={{ marginTop: 8 }}>
        <Text style={{ textAlign: "center", color: "#000" }}>
          {showForm ? "Esconder formulário" : "Mostrar formulário"}
        </Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 14, marginLeft: 8, fontSize: 20, color: "#000" }}>
        Usuários:
      </Text>

      <FlatList
        style={styles.list}
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <UserList user={item} handleEdit={(item) => editUser(item)} />}
      />

      <TouchableOpacity onPress={handleLogout} style={styles.buttonLogout}>
        <Text style={{ justifyContent: 'center', textAlign: 'center', color: "#FFF" }}>Sair da conta</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 8,
    margin: 20,
    borderRadius: 5,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  },
  lable: {
    color: "#000",
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  list: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  buttonLogout: {
    backgroundColor: "red",
    margin: 14,
    padding: 8,
    borderRadius: 5

  }
});


