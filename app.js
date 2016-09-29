var app = new Vue({
	el:"#app",
	data:{
		title:"Contas a receber",
		menus:[
			{id:0,name:"Listar Contas"},
			{id:1,name:"Criar Contas"}
		],
		activedView:0,
		formType:'insert',
		bill:{
			date_due:'',
			name:'',
			value:0,
			done:0
		},
		names:[
			"Conta de luz",
			"Conta de agua",
			"Cartão de crédito",
			"Supermercado"

		],
		bills:[
			{date_due:'20/08/2016',name:"Conta de luz",value:25.90,done:0},
			{date_due:'21/08/2016',name:"Conta de água",value:35.90,done:1},
			{date_due:'22/08/2016',name:"Conta de telefone",value:75.90,done:0},
			{date_due:'23/08/2016',name:"Fatura Cartão de crédito",value:505.90,done:0},
		],
		
	},
	computed:{
		status:function(){
			var count = 0;
			for(var i in this.bills){

				if(!this.bills[i].done){
					count++;
					
				}
			
			}
			return !count?"Nenhuma conta a pagar":"Existem " + count + " a serem pagas";
		},

		statusClass:function(){
			var count = 0;
			for(var i in this.bills){

				if(!this.bills[i].done){
					count++;
				}
			}
			if(count > 0){
				return 'nao-pago';
			}else if(count == 0){
				return 'pago';
			}else{
				return 'nao-cadastrado';
			}
		}
	},

	methods:{
		showView:function(id){
			this.activedView == id;
			if(id == 1){
				this.formType = 'insert';
			}
		},
		submit:function(){
		if(this.formType == 'insert'){
			this.bills.push(this.bill);	
		}
		this.bill = {
			date_due:'',
			name:'',
			value:0,
			done:0
		};
		this.activedView = 0;
	},
	delbill:function(bill){
		if(confirm('Deseja excluir esta conta ?')){
			this.bill = bill;
			this.bills.splice(this.bill,1);
		}
	},
	loadbill:function(bill){
		this.bill = bill;
		this.activedView = 1;
	},
	pgBill:function(bill){
		this.bill = bill;
		this.bill.done = 1;
	},
	nPgBill:function(bill){
		this.bill = bill;
		this.bill.done = 0;
	}

	},
	
	
});
Vue.filter('doneLabel',function(value){
	if(value == false){
		return "Não Paga";
	}else{
		return "Paga";
	}
});