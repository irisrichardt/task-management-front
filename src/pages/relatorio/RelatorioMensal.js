import React, { useState, useEffect } from "react";
import { fetchTeams } from "../../services/teamService";
import { fetchUsers } from "../../services/userService";
import { fetchTasks } from "../../services/taskService";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Navbar from "../../components/Navbar";
import "../../components/styles.css";

function RelatorioMensal() {
  const [usuarios, setUsuarios] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString("pt-BR");
  };

  const traduzirStatus = (status) => {
    switch (status) {
      case "DONE":
        return "CONCLUÍDO";
      case "TO_DO":
        return "PENDENTE";
      case "IN_PROGRESS":
        return "EM ANDAMENTO";
      default:
        return status;
    }
  };

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      paddingTop: 10,
      paddingLeft: 60,
      paddingRight: 60,
      lineHeight: 1.5,
      flexDirection: "column",
    },
    titleContainer: {
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
      marginTop: 12,
    },
    reportTitle: {
      color: "#808080",
      letterSpacing: 4,
      fontSize: 25,
      textAlign: "center",
      textTransform: "uppercase",
      marginBottom: 12,
    },
    invoiceDateContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    invoiceDate: {
      fontSize: 12,
      fontStyle: "bold",
    },
    tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 4,
      borderWidth: 1,
      borderColor: "#808080",
    },
    row: {
      flexDirection: "row",
      borderBottomColor: "#808080",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
      fontSize: 12,
      fontStyle: "bold",
    },
    description: {
      width: "85%",
      textAlign: "center",
      borderRightColor: "#808080",
      borderRightWidth: 1,
      paddingRight: 8,
    },
    columnHeader: {
      width: "85%",
      textAlign: "center",
      borderRightColor: "#808080",
      borderRightWidth: 1,
      paddingRight: 8,
      fontWeight: "bold",
    },
    tableTitle: {
      width: "100%",
      textAlign: "left",
      marginTop: 16,
      marginBottom: 2,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  useEffect(() => {
    fetchTeams()
      .then((data) => setTeams(data))
      .catch((error) => setError("Failed to fetch teams"));
  }, []);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsuarios(data))
      .catch((error) => setError("Failed to fetch users"));
  }, []);

  useEffect(() => {
    fetchTasks()
      .then((data) => setAtividades(data))
      .catch((error) => setError("Failed to fetch activities"));
  }, []);

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        <h2 className="titule mb-4">Relatório Mensal</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p>Data do relatório: {getCurrentDate()}</p>
          <p>Usuários: {usuarios.length}</p>
          <p>Atividades: {atividades.length}</p>
          <p>Equipes: {teams.length}</p>
          {error && <p className="text-red-500">Erro: {error}</p>}

          {/* Tabela de Usuários */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Lista de Usuários</h3>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 text-center border">Username</th>
                    <th className="py-2 px-4 text-center border">Nome</th>
                    <th className="py-2 px-4 text-center border">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id} className="text-gray-600">
                      <td className="py-2 px-4 text-center border">
                        {usuario.username}
                      </td>
                      <td className="py-2 px-4 text-center border">
                        {usuario.name}
                      </td>
                      <td className="py-2 px-4 text-center border">
                        {usuario.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabela de Tarefas */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Lista de Tarefas</h3>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 text-center border">Título</th>
                    <th className="py-2 px-4 text-center border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {atividades.map((atividade) => (
                    <tr key={atividade.id} className="text-gray-600">
                      <td className="py-2 px-4 text-center border">
                        {atividade.title}
                      </td>
                      <td className="py-2 px-4 text-center border">
                        {traduzirStatus(atividade.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabela de Equipes */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Lista de Equipes</h3>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 text-center border">Nome</th>
                    <th className="py-2 px-4 text-center border">
                      Número de membros
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((equipe) => (
                    <tr key={equipe.id} className="text-gray-600">
                      <td className="py-2 px-4 text-center border">
                        {equipe.name}
                      </td>
                      <td className="py-2 px-4 text-center border">
                        {equipe.members.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PDF Download Link */}
        <PDFDownloadLink
          document={
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.titleContainer}>
                  {/* Insira seu logotipo aqui, se necessário */}
                </View>
                <Text style={styles.reportTitle}>Relatório Mensal</Text>
                <View style={styles.invoiceDateContainer}>
                  <Text style={styles.invoiceDate}>
                    Data do Relatório: {getCurrentDate()}
                  </Text>
                </View>
                <View style={styles.invoiceDateContainer}>
                  <Text style={styles.invoiceDate}>
                    Total de usuários: {JSON.stringify(usuarios.length)}
                  </Text>
                </View>
                <View style={styles.invoiceDateContainer}>
                  <Text style={styles.invoiceDate}>
                    Total de atividades: {JSON.stringify(atividades.length)}
                  </Text>
                </View>
                <View style={styles.invoiceDateContainer}>
                  <Text style={styles.invoiceDate}>
                    Total de equipes: {JSON.stringify(teams.length)}
                  </Text>
                </View>

                {/* Lista de Usuários */}
                <Text style={styles.tableTitle}>Lista de Usuários</Text>
                <View style={styles.tableContainer}>
                  <View style={styles.row}>
                    <Text style={styles.columnHeader}>Username</Text>
                    <Text style={styles.columnHeader}>Nome</Text>
                    <Text style={styles.columnHeader}>Email</Text>
                  </View>
                  {usuarios.map((usuario) => (
                    <View style={styles.row} key={usuario.id}>
                      <Text style={styles.description}>{usuario.username}</Text>
                      <Text style={styles.description}>{usuario.name}</Text>
                      <Text style={styles.description}>{usuario.email}</Text>
                    </View>
                  ))}
                </View>

                {/* Lista de Tarefas */}
                <Text style={styles.tableTitle}>Lista de Tarefas</Text>
                <View style={styles.tableContainer}>
                  <View style={styles.row}>
                    <Text style={styles.columnHeader}>Título</Text>
                    <Text style={styles.columnHeader}>Status</Text>
                  </View>
                  {atividades.map((atividade) => (
                    <View style={styles.row} key={atividade.id}>
                      <Text style={styles.description}>{atividade.title}</Text>
                      <Text style={styles.description}>
                        {traduzirStatus(atividade.status)}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Lista de Equipes */}
                <Text style={styles.tableTitle}>Lista de Equipes</Text>
                <View style={styles.tableContainer}>
                  <View style={styles.row}>
                    <Text style={styles.columnHeader}>Nome</Text>
                    <Text style={styles.columnHeader}>Número de membros</Text>
                  </View>
                  {teams.map((equipe) => (
                    <View style={styles.row} key={equipe.id}>
                      <Text style={styles.description}>{equipe.name}</Text>
                      <Text style={styles.description}>
                        {equipe.members.length}
                      </Text>
                    </View>
                  ))}
                </View>
              </Page>
            </Document>
          }
          fileName="relatorio_mensal.pdf"
        >
          {({ loading }) =>
            loading ? (
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Gerando PDF
              </button>
            ) : (
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Baixar PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </>
  );
}

export default RelatorioMensal;
