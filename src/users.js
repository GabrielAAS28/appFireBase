import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from './firebaseConnections';
import { deleteDoc, doc } from 'firebase/firestore';

export function UserList({ user, handleEdit }) {

    async function handleDeleteItem() {
        const docRef = doc(db, "users", user.id);
        await deleteDoc(docRef);
    }

    function handleEditUser() {
        handleEdit(user);
    }

    return (
        <View style={styles.userContainer}>
            <Text style={styles.userText}>Nome: {user.nome}</Text>
            <Text style={styles.userText}>Idade: {user.idade}</Text>
            <Text style={styles.userText}>Cargo: {user.cargo}</Text>

            <TouchableOpacity style={styles.button} onPress={handleDeleteItem}>
                <Text style={styles.buttonText}>Deletar usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonEdit} onPress={handleEditUser}>
                <Text style={styles.buttonText}>Editar usuario</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    userContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userText: {
        color: "#000",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#B3261E",
        alignSelf: "flex-start",
        padding: 4,
        borderRadius: 4,
        marginTop: 16
    },
    buttonText: {
        color: "#FFF",
        paddingLeft: 8,
        paddingRight: 8,
    },
    buttonEdit: {
        backgroundColor: "#000",
        alignSelf: "flex-start",
        padding: 4,
        borderRadius: 4,
        marginTop: 16
    },
});