var dados = []

function PopulaTabelas(){
    if(Array.isArray(dados)){
        localStorage.setItem("__dados__", JSON.stringify(dados))
        $("#tblDados tbody").html("")
        //Inserção de dados
        dados.forEach(function(item){
            $("#tblDados tbody").append(`
            <tr>
                <td>${item.ID}</td>
                <td>${item.Nome}</td>
                <td>${item.Sobrenome}</td>
                <td>${item.DataNascimento}</td>
                <td>${item.Curso}</td>
                <td><button type="button" class="btn btn-primary" onclick="javascript:AtualizaCadastro(${item.ID});">Atualizar</button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript:DeletaCadastro(${item.ID});">Deletar</button></td>
            </tr>
            `)
        })
       
    }
}

function AtualizaCadastro(id){
    let confirmarAtt = confirm("REalmente deseja Atualziar este Cadastro?")
    if(confirmarAtt){
        $("#registroModal").modal("show")
        dados.forEach(function(item){
            if(item.ID == id){
                $("#controlId").val(item.ID)
                $("#txtNome").val(item.Nome)
                $("#txtSobrenome").val(item.Sobrenome)
                $("#txtDataNascimento").val(item.DataNascimento)
                $("#txtCurso").val(item.Curso)
            }

        })
    }
}

function DeletaCadastro(id){
    let confirmarDel = confirm("Realmente deseja excluir este cadastro?")
    if(confirmarDel){
        for(let i = 0; i<dados.length; i++){
            if(dados[i].ID == id){
                dados.splice(i,1)
            }
        }
        PopulaTabelas()
    }

}

//Ao carregar a Tela
$(function(){
    $("#btnSalvar").click(function(){
        dados = JSON.parse(localStorage.getItem("__dados__"))

        if(dados){
            PopulaTabelas()
        }

        let registro = {}
        let attId = $("#controlId").val()
        let nome = $("#txtNome").val()
        let sobrenome = $("#txtSobrenome").val()
        let datanasc = $("#txtDataNascimento").val()
        let curso = $("#txtCurso").val()

        if(!attId || attId == "0"){
            registro.Nome = nome
            registro.Sobrenome = sobrenome
            registro.DataNascimento = datanasc
            registro.Curso = curso
            registro.ID = dados.length + 1
        
            dados.push(registro)
            alert("Cadastrado com Sucesso!")

        } else{
            let confirmarAtt = confirm("Realmente deseja Atualziar este Cadastro?")
            if(confirmarAtt){
                dados.forEach(function(item){
                    if(item.ID == attId){
                        item.Nome = nome
                        item.Sobrenome = sobrenome
                        item.DataNascimento = datanasc
                        item.Curso = curso
                        alert("Alteração realizada com sucesso")
                    }
                })
            }
        }

        

        
        $("#registroModal").modal("hide")
        $("#controlId").val("0")
        $("#txtNome").val("")
        $("#txtSobrenome").val("")
        $("#txtDataNascimento").val("")
        $("#txtCurso").val("")
        PopulaTabelas()
    })
})
