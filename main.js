var router = new VueRouter();
var mainComponent = Vue.extend({
	components:{
		'bill-component': billComponent
	},
	template:'<bill-component></bill-component>',
	data: function(){
		return{
			billPays:[
					{date_due:'20/08/2016',name:"Conta de luz",value:25.90,done:0},
					{date_due:'21/08/2016',name:"Conta de água",value:35.90,done:1},
					{date_due:'22/08/2016',name:"Conta de telefone",value:75.90,done:0},
					{date_due:'23/08/2016',name:"Fatura Cartão de crédito",value:505.90,done:0},
				  ],

				billReceive:[
					{date_due: '06/12/2016', name: 'Salário', value: 2475, done: true},
                	{date_due: '04/12/2016', name: 'Aluguel', value: 1220, done: true},
				]  

		}
	}
});


router.map({

	'/':{
		name:'dashboard',
		component: dashboardComponent
	},

	'/bill-pays':{
		component:billPayComponent,
		subRoutes:{
		'/':{
		name:'bill-pay.list',
		component:billPayListComponent
	},
	'/create':{
		name:'bill-pay.create',
		component:billPayCreateComponent
	},
	'/:index/update':{
		name:'bill-pay.update',
		component:billPayCreateComponent
	}
		
	},
},

	'/bill-receive':{
		component:billReceiveComponent,
		subRoutes:{
		'/':{
		name:'bill-receive.list',
		component:billReceiveListComponent
	},
	'/create':{
		name:'bill-receive.create',
		component:billReceiveCreateComponent
	},
	'/:index/update':{
		name:'bill-receive.update',
		component:billReceiveCreateComponent
	}
		
	}
}
	
});

router.start({
	components:{
		'main-component':mainComponent
	}
},'#app');

