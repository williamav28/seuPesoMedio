# ⚖️ Weight Trend Calculator

Uma aplicação web moderna desenvolvida para ajudar no monitoramento de peso corporal, focando na **tendência real** e na **saúde mental**, mitigando a ansiedade causada pelas flutuações diárias naturais do organismo.



## 🎯 O Problema e a Solução
O peso corporal pode variar drasticamente em 24 horas devido a retenção de líquidos, glicogênio e inflamação. O foco excessivo nessas flutuações diárias muitas vezes leva à desmotivação. 

Esta calculadora utiliza o princípio da **Média Móvel de 7 dias**:
- **Estabilidade:** Suaviza picos e quedas irreais.
- **Tendência:** Mostra se você está realmente em déficit ou superávit calórico ao longo da semana.
- **Dashboard Limpo:** Foca no que importa: o progresso semanal.

## ✨ Funcionalidades
- 🔐 **Autenticação Segura:** Sistema de Cadastro e Login via Firebase Auth.
- ⚡ **Dados em Tempo Real:** Sincronização instantânea com Firestore (OnSnapshot).
- 📊 **Cálculo Automático:** Média calculada dinamicamente com base nos últimos 7 registros.
- 🗑️ **Gestão de Histórico:** Opção para remover registros inseridos incorretamente.
- 📱 **Interface Responsiva:** Design "Glassmorphism" otimizado para qualquer dispositivo usando Tailwind CSS.

## 🛠️ Tecnologias
- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- [React Router Dom](https://reactrouter.com/)

## 🚀 Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone [[https://github.com/seu-usuario/seu-repositorio.git](https://github.com/williamav28/seuPesoMedio.git)
   ```
2. **Acesse a pasta:**
   ```bash
      cd seuPesoMedio
   ```
3. Inicie o projeto: Basta abrir o arquivo index.html em qualquer navegador moderno.

## 📄 Licença

Este projeto está sob a licença MIT - consulte o arquivo LICENSE para detalhes.

Desenvolvido com 💜 por williamav28
