import api from "../../../../plugins/api"

export default {
    props: {
        avaliacao: {
            require: true
        }
    },
    data: () => ({
        form: [
            {
                criterio: 'Proatividade',
                valor: null
            },
            {
                criterio: 'Autonomia',
                valor: null
            },
            {
                criterio: 'Colaboracao',
                valor: null
            },
            {
                criterio: 'Entrega de Resultados',
                valor: null
            }
        ]
    }),
    methods: {
        removerSelecao() {
            this.$emit('removerSelecao')
        },
        avaliarAluno(e) {
            e.preventDefault()

            this.$swal.fire({
                title: 'Enviando sua avaliação, aguarde...'
            })
            this.$swal.showLoading()

            api.aluno.enviarAvaliacao(this.form.map(nota => ({
                avaliacao: this.avaliacao.id,
                criterio: nota.criterio,
                nota: nota.valor
            })), 5)
                .then(() => {
                    this.$swal.fire({
                        title: 'Sucesso!',
                        text: 'Sua avaliação foi enviada com sucesso.',
                        text: 'success'
                    })
                    this.$emit('avaliacaoEnviada')
                })
        }
    }
}