import AbrirNovoPeriodoAvaliacao from './abrir-novo-periodo-avaliacao/abrir-novo-periodo-avaliacao.vue'
import ProfessorService from '../../../services/professor.service'

export default {
  components: {
    'app-abrir-novo-periodo-avaliacao': AbrirNovoPeriodoAvaliacao
  },
  data: () => ({
    projetos: [
      {
        text: '-- Selecione a qual projeto este perído será destinado --', value: null, disabled: true
      }
    ],
    projetosAvaliacao: []
  }),
  created () {
    this.buscarProjetos()
  },
  methods: {
    buscarProjetos () {
      this.projetos = [
        {
          text: '-- Selecione a qual projeto este perído será destinado --', value: null, disabled: true
        }
      ]
      ProfessorService.buscarProjetos()
        .then(res => res.data)
        .then(data => {
          data.forEach(projeto => {
            // Adicionando o projeto na listagem para abertura de avaliações
            this.projetos.push({
              text: `Projeto ${projeto.id}`,
              value: projeto.id
            })

            // Organizando os projetos para apresentação das avaliações existentes.
            this.organizarAvaliacoes(projeto)
          })
        })
    },
    organizarAvaliacoes (projeto) {
      const that = this
      this.projetosAvaliacao = []
      this.projetosAvaliacao.push((function () {
        projeto.avaliacoes = that.groupBy(projeto.avaliacoes, 'sprint')
        const keys = Object.keys(projeto.avaliacoes)
        keys.forEach(key => {
          projeto.avaliacoes[key] = that.groupBy(projeto.avaliacoes[key], 'avaliador')
        })
        return projeto
      }()))
    },
    groupBy (arr, key) {
      return arr.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x)
        return rv
      }, {})
    }
  }
}
