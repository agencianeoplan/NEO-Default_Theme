import { setInStorage } from '../functions/storage'
import { loadSessionForm, jetDebug } from './utilitariosDaProva'

$(document).ready(function () {

  /**
   * 
   * e) Crie uma página ou utilize uma forma de recuperar os valores da sessão para
   * que seja possível editá-los e/ou atualizá-los. (2 Pts)
   * 
   */

  loadSessionForm()

  /**
   * 
   * b) Todos os campos devem ser obrigatórios e os campos e-mail e telefone devem
   * ser validados corretamente. (2 Pts)
   * 
   */

  $('#formFrontEnd').form({
    fields: {
      nome: {
        identifier: "nome",
        rules: [{
          type     : "regExp",
          value    : /\S+(?:\s+\S+)+/,
          prompt   : "Informe um nome e sobrenome. (Ex: João Silva ou Maria Silva)"
        }]
      },
      email: {
        identifier: "email",
        rules: [{
          type     : "regExp",
          value    : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u,
          prompt   : "E-mail inválido"
        }]
      },
      telefone: {
        identifier: "telefone",
        rules: [{
          type   : "regExp",
          value  : /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/,
          prompt : "Informe um telefone nos formatos (99) 9999-9999 ou (99) 99999-9999"
        }]
      },
      assunto: {
        identifier: 'assunto',
        rules: [{
          type   : 'minLength[3]',
          prompt : 'Informe um assunto com no mínimo 3 caracteres'
        }]
      },
      mensagem: {
        identifier: 'mensagem',
        rules: [{
          type   : 'minLength[3]',
          prompt : 'Escreva uma mensagem com no mínimo 3 caracteres'
        }]
      },
    },
    onFailure: function(formErrors, fields) {
      return false
    },
    onSuccess: function(event, fields) {

      /**
       * 
       * d) Salve as informações do formulário na sessão do navegador (sessionStorage).
       * (2 Pts)
       * 
       */

      setInStorage('@prova:frontend', JSON.stringify(fields))

      swal({
        title: 'Formulário salvo no sessionStorage!',
        html: '<b>Atualize ou abra essa aba novamente para ver.</b>',
        type: 'success',
        focusConfirm: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      })

      return false
    }
  })

  /**
   * 
   * c) Conforme os campos forem sendo preenchidos, os valores devem ficar visíveis
   * ao lado do formulário (Campo: Valor). (2 Pts)
   * 
   */

  $('.field input, .field textarea').on('input', jetDebug)
  // $('.field input, .field textarea').on('keyup', jetDebug) // fallback para navegadores que não suportam o evento INPUT
})
