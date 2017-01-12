Vue.filter('doneLabel',function(value){
	if(value == false){
		return "Não Paga";
	}else{
		return "Paga";
	}
});

Vue.filter('receiveLabel',function(value){
    if(value == false){
        return "A Receber";
    }else{
        return "Recebido";
    }
});


Vue.filter('accountStatus', function (value) {

    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (value > 0) {
        return "Existem " + value + " contas a serem pagas";
    }
    return "Nenhuma conta a ser paga"

});