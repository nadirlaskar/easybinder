window.Binder = (function($){
   function Binder(config){
   		this.model = config.model;
      this.root = config.root?config.root:"body";
   }
   
   Binder.prototype={
   	 parseControls: function(){
     			this.inputElements = $("input[bind]:not([type='radio'],input.bind[type='checkbox'])",this.root);
          this.groupElements =  $("input[bind][type='checkbox'],input[bind][type='radio'],select[bind]",this.root);
          this.generalElements = $("*[bind]:not(input,select)",this.root);
     },
     
     getLeafKey: function(targetStr,callback){
        targetStr.split(".").reduce((obj,key) => {
            if(typeof obj[key] != "object" || obj[key] instanceof Array)
            	callback(obj,key);
            else return obj[key];
        },this.model);
     },
     
     updateControls: function(){
     		this.inputElements.each((i,el)=>{
        		this.getLeafKey($(el).attr("bind"),(obj,key)=>{
            		this.updateValue(obj,key,$(el));
            });
        });
        
        this.generalElements.each((i,el)=>{
        		this.getLeafKey($(el).attr("bind"),(obj,key)=>{
            		this.updateValue(obj,key,$(el));
            });
        });
        
        this.groupElements.each((i,el)=>{
        	this.getLeafKey($(el).attr("bind"),(obj,key)=>{
            		this.updateValue(obj,key,$(el));
            });
        });
     },
     
     updateValue: function(o,key,el){
     		switch(el.prop("tagName").toLowerCase()){
        	case "input":
            if(el.prop("type").toLowerCase()=="checkbox"||el.prop("type").toLowerCase()=="radio"){
              if($("input[type='"+el.prop("type")+"'][name='"+key+"']").length>1){
              		$("input[type='"+el.prop("type")+"'][name='"+key+"'][value='"+o[key]+"']").prop("checked",true);
              }else{
              		el.prop("checked",o[key]);
              }
            	
            }
            else el.val(o[key]); break;
          default:
            el.text(o[key]);
           
        }
     },
     
     update: function(model=this.model,root=this.root){
        if(this.model != model){
        		this.model = mode;
        }
        
        if(this.root != root){
        	this.root = root;
        }
        
     		this.updateControls();
     }
   }
   
   return Binder;

})($);