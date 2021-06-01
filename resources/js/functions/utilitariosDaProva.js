import { nl2br } from './stringHelpers'
import { getFromStorage, checkStorage } from './storage'

/**
 * 
 * Coloquei no /resources/js/ui/modules/mask.js e depois tirei porque o escopo da prova diz que todas as funções (dessa prova) devem estar aqui na pasta functions
 * 
 */

export const maskCellphone = v =>
{
  var len = 0;

  //Remove tudo o que não é dígito
  v = v.replace(/\D/g, "");
  v = v.replace(/\-/g, "");
  v = v.replace(/\./g, "");

  len = v.length;

  //Coloca parênteses em volta dos dois primeiros dígitos
  v = v.replace(/^(\d\d)(\d)/g, "($1) $2");

  //Coloca hífen entre o quarto e o quinto dígitos
  if (len > 10) {
    v = v.replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
  } else {
    v = v.replace(/(\d{4})(\d)/, "$1-$2").slice(0, 14);
  }

  return v;
}

/**
 * 
 * Responsável por ler o formulário salvo no sessionStorage e colocar na tela
 * 
 */

export const loadSessionForm = () => {
  if (checkStorage('@prova:frontend')) {
    const campos = JSON.parse(getFromStorage('@prova:frontend'))

    /* Preenche o formulário usando os dados salvos na sessionStorage */
    $('[name="nome"]').val(campos.nome)
    $('[name="email"]').val(campos.email)
    $('[name="telefone"]').val(campos.telefone)
    $('[name="assunto"]').val(campos.assunto)
    $('[name="mensagem"]').val(campos.mensagem)

    /* Preenche a área de DEBUG também */
    $('#debugNome').html(campos.nome)
    $('#debugEmail').html(campos.email)
    $('#debugTelefone').html(campos.telefone)
    $('#debugAssunto').html(campos.assunto)
    $('#debugMensagem').html(nl2br(campos.mensagem))
  }
}

/**
 * 
 * Responsável por jogar os valores do formulário dentro da tabela de "DEBUG"
 * 
 */

export const jetDebug = event => {
  const debugFieldName = event.target.getAttribute('data-debug')
  const debugField = document.getElementById(debugFieldName)

  if (debugFieldName && debugField) {
    const debugValue = $.trim(event.target.value)
    debugField.innerHTML = debugValue === '' ? '...' : nl2br(debugValue)

    /**
     * 
     * O tema padrão da JET já oferece uma máscara de telefone, ela é encontrada no arquivo /resources/js/ui/modules/mask.js e aplicada por meio da classe "mask_phone",
     * mas essa máscara não é aplicada corretamente quando o valor do telefone é "setado" usando val(), ou seja, dinamicamente.
     * 
     * Então usei uma máscara alternativa para:
     * - Corrigir esse bug.
     * - Carregar o telefone salvo no sessionStorage e atender o item (E) da prova.
     * 
     */

    if (debugFieldName === 'debugTelefone') event.target.value = maskCellphone(event.target.value)
  }
}
