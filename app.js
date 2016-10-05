
Vue.filter('doneLabel',function(value){
	if(value == false){
		return "Não Paga";
	}else{
		return "Paga";
	}
});

var menuComponent = Vue.extend({
	template:
	`<nav>
		<ul>
			<li v-for="o in menus"><a href="#" @click.prevent="showView(o.id)">{{o.name}}</a></li>
		</ul>
	</nav>`,
	data:function(){
		return {
			menus:[
			{id:0,name:"Listar Contas"},
			{id:1,name:"Criar Contas"}
		],
		};
	},
	methods:{
		showView:function(id){
			this.$parent.activedView == id;
			if(id == 1){
				this.$parent.formType = 'insert';
			};
		},
	}
});


var billListComponent = Vue.extend({
	template:
	`<table border="1" cellpadding="10">
	<thead>
		<tr>
			<td>#</td>
			<td>Vencimento</td>
			<td>Nome</td>
			<td>Valor</td>
			<td>Paga</td>
			<td>Ações</td>
			
		</tr>
	</thead>
	<tbody>
		<tr v-for="(index,o) in bills">
			<td>{{index + 1}}</td>
			<td>{{o.date_due}}</td>
			<td>{{o.name}}</td>
			<td>{{o.value | currency 'R$' 2}}</td>
			<td  class="minha-classe" :class="{'pago':o.done,'nao-pago':!o.done}">{{o.done | doneLabel}}</td>
			<td>
				<a href="#" @click.prevent="loadbill(o)">Editar</a>
				<a href="#" @click.prevent="delbill(o)">excluir</a>
				<button @click.prevent="pgBill(o)">Paga</button>
				<button @click.prevent="nPgBill(o)">Não paga</button>
			</td>
		</tr>
	</tbody>
</table>`,
	data: function(){
		return {
			bills:[
			{date_due:'20/08/2016',name:"Conta de luz",value:25.90,done:0},
			{date_due:'21/08/2016',name:"Conta de água",value:35.90,done:1},
			{date_due:'22/08/2016',name:"Conta de telefone",value:75.90,done:0},
			{date_due:'23/08/2016',name:"Fatura Cartão de crédito",value:505.90,done:0},
		]

		};
	},
	methods:{
		delbill:function(bill){
		if(confirm('Deseja excluir esta conta ?')){
			this.bill = bill;
			this.bills.splice(this.bill,1);
			//ou this.bill.$remove(bill)
		}
	},
	loadbill:function(bill){
		this.$parent.bill = bill;
		this.$parent.activedView = 1;
	},

	},
});

var billCreateComponent = Vue.extend({
	template:
	`<form name="form" @submit.prevent="submit">
	<br/><br/>
		<label for="">Vencimento</label>
		<input type="text" v-model="bill.date_due">
	<br/><br/>	
		<label for="">Nome</label>
		<select name="" id="" v-model="bill.name">
			<option v-for="o in names" value="{{o}}">{{o}}</option>
		</select>
	<br/><br/>	
		<label for="">valor</label>
		<input type="text" v-model="bill.value">
		<br/><br/>
		<label for="">Pago ?</label>
		<input type="checkbox" v-model="bill.done"/>
		<br/><br/>
		<input type="submit" value="enviar">
	</form>`,
	props:['bill','formType'],
	data:function(){
		return {
			names:[
			"Conta de luz",
			"Conta de agua",
			"Cartão de crédito",
			"Supermercado"

		],
		};
	},
	methods:{
		submit:function(){
		if(this.formType == 'insert'){
			this.$parent.$children[1].bills.push(this.bill);	
		}
		this.bill = {
			date_due:'',
			name:'',
			value:0,
			done:0
		};
		this.activedView = 0;
	},

	}
});

var appComponent = Vue.extend({
	components:{
		'menu-component':menuComponent,
		'bill-list-component':billListComponent,
		'bill-create-component':billCreateComponent
	},
	template:
	`<style type="text/css">
		.pago{
			color:green;
		}
		.nao-pago{
			color:red;
		}
		.minha-classe{
			background-color:#f0f0f0;
		}
		.nao-cadastrado{
			color:#808080;
		}
	</style>
	<h1>{{title}}</h1>
<h3 :class="[statusClass]">{{status}}</h3>

<menu-component></menu-component>

<div v-show="activedView == 0">
	<bill-list-component v-ref:bill-list-component></bill-list-component>
</div>
<div v-show="activedView == 1">
	<bill-create-component v-bind:bill.sync="bill" v-bind:form-type="formType"></bill-create-component>
</div>`,
	data:function(){
		return{
		title:"Contas a receber",
		activedView:0,
		formType:'insert',
		bill:{
			date_due:'',
			name:'',
			value:0,
			done:0
		},
		
		
		};
	},
	computed:{
		status:function(){
			
			var count = 0;
			var billListComponent = this.$refs.billListComponent;
			for(var i in billListComponent){
				if(!billListComponent.bills[i].done){
					count++;
					
				}
			
			}
			return !count?"Nenhuma conta a pagar":"Existem " + count + " a serem pagas";
		},

		statusClass:function(){
			var count = 0;
			for(var i in billListComponent){

				if(!billListComponent.bills[i].done){
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
Vue.component('app-component',appComponent);

var app = new Vue({
	
	el:"#app",
});
