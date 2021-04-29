//podemos abstrair e transformar a despesa em um objeto despesa dentro da aplicação
//podemos criar um objeto a partir de uma classe, um objeto literal ou através de funções construtoras
//para praticar, será criado um objeto de classe 

class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

let d = new Despesa()

class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id') //0
        return parseInt(proximoId) + 1
    }

    //função que recebe um objeto literal e grava ele no local storage do browser
    //O método setItem de localStorage recebe dois parâmetros (descrição do item e o item a ser armazenado)
    //o dado tem de ser convertido de objeto literal para notação JSON através da biblioteca nativa de JS que é a JSON e seu método stringify que recebe o objeto literal a ser convertido
    //podemos converter um JSON para um objeto literal também através do método parse() passando o objeto JSON
    //o método setItem abre um protocolo de comunicação com local storage e envia a representação JSON do objeto literal
    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recupera todas as despesas cadastradas em local storage
        for (let i = 1; i <= id; i++) {
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            //verifica a possibilidade de haver índices que foram pulados/removidos
            //nestes casos nós vamos pular esses índices
            if(despesa === null) {
                continue
            }

            despesas.push(despesa)
        }

        return despesas
    }
}

let bd = new Bd()

//função para recuperar os valores do formulário de cadastro de despesa
function cadastrarDespesa() {

    let ano = document.getElementById('ano')

    let mes = document.getElementById('mes')

    let dia = document.getElementById('dia')

    let tipo = document.getElementById('tipo')

    let descricao = document.getElementById('descricao')

    let valor = document.getElementById('valor')


    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        bd.gravar(despesa)
        //dialog de sucesso
        document.getElementById('exampleModalLabel').innerHTML = 'Dados inseridos com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal-body').innerHTML = 'Despesa foi cadastrada com sucesso!'
        document.getElementById('botao-modal').innerHTML = 'Voltar'
        document.getElementById('botao-modal').className = 'btn btn-success'

        $('#modalRegistraDespesa').modal('show')

    } else {
        //dialog de erro
        document.getElementById('exampleModalLabel').innerHTML = 'Erro na inclusão dos dados'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal-body').innerHTML = 'Existem campos  obrigatórios que não foram preenchidos!'
        document.getElementById('botao-modal').innerHTML = 'Voltar e corrigir'
        document.getElementById('botao-modal').className = 'btn btn-danger'

        $('#modalRegistraDespesa').modal('show')
    }

}

function carregaListaDespesas() {
    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()

    console.log(despesas)
}