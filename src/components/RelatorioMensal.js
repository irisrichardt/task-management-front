import React, { useState, useEffect } from "react";
import { fetchTeams } from "../services/teamService";
import { fetchUsers } from "../services/userService";
import { fetchTasks } from "../services/authService";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

function RelatorioMensal() {
  const [usuarios, setUsuarios] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString("pt-BR");
  };

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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Relatório Mensal</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <p>Data do relatório: {getCurrentDate()}</p>
        <p>Usuários: {JSON.stringify(usuarios.length)}</p>
        <p>Atividades: {JSON.stringify(atividades.length)}</p>
        <p>Equipes: {JSON.stringify(teams.length)}</p>
        {error && <p className="text-red-500">Erro: {error}</p>}
      </div>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.header}>Relatório Mensal</Text>
                <Text style={styles.subheader}>
                  Data do Relatório: {getCurrentDate()}
                </Text>
                <View style={styles.content}>
                  <Text style={styles.text}>
                    Usuários: {JSON.stringify(usuarios.length)}
                  </Text>
                  <Text style={styles.text}>
                    Atividades: {JSON.stringify(atividades.length)}
                  </Text>
                  <Text style={styles.text}>
                    Equipes: {JSON.stringify(teams.length)}
                  </Text>
                  {error && <Text style={styles.errorText}>Erro: {error}</Text>}
                </View>
              </View>
            </Page>
          </Document>
        }
        fileName="relatorio_mensal.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Carregando documento..." : "Baixar PDF do Relatório"
        }
      </PDFDownloadLink>
    </div>
  );
}

// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  content: {
    marginTop: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 12,
  },
});

export default RelatorioMensal;
