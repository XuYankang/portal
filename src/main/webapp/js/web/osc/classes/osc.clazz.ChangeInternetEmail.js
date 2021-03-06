/*************************************************************************************
* @author 
*
* Define Home Object
* using the flowing query to extend changeInternetEmailOption
*
* jQuery.extend(jQuery.changeInternetEmailOption, {
* });
*
*************************************************************************************/

(function($) {
$.changeInternetEmailOption = function() {};
$.extend($.changeInternetEmailOption, {
	loading : "#progress_loading_img",
	func : {
		callbackExecuted : null, //function (responseText)
		callbackExecuteFail : null //function()
	},	
	form : {
		name : "#fChangeInternetEmail",
		fields : {
			accountNumber			: "#fChangeInternetEmail_accountNumber",
			errorMessage			: "#fChangeInternetEmail_errorMessage",
			email					: "#fChangeInternetEmail_email",
			newEmail				: "#fChangeInternetEmail_newEmail",
			cacheData				: "#fChangeInternetEmail_cacheData",
			tradingPassword			: "#fChangeInternetEmail_tradingPassword",
			userAction				: "#fChangeInternetEmail_userAction",
			caller					: "#fChangeInternetEmail_caller"
		}
	},
	buttons : {
		confirm 	: "#fChangeInternetEmail_confirm",
		change		: "#fChangeInternetEmail_change"
	}
});
})(jQuery);

/*************************************************************************************
* @author 
*
* @public: OSCClazzChangeInternetEmail Class
*
*************************************************************************************/
function OSCClazzChangeInternetEmail() {
	this.validator = null;
	
	jQuery.extend(jQuery.changeInternetEmailOption, {
		clazzHandler : this
	});
}

/*************************************************************************************
* init getOption
**************************************************************************************/
OSCClazzChangeInternetEmail.prototype.getOption = function () {
	return $.changeInternetEmailOption;
};

/*************************************************************************************
* init functionality
**************************************************************************************/
OSCClazzChangeInternetEmail.prototype.init = function() {
	var _this = this;
	var opts = _this.getOption();

	_this.resetInitData();
	
	//+++ init validation
	_this.validator = $(opts.form.name).validate({debug: false});				
	
	$(opts.form.fields.newEmail).rules("add", { required: true, email: true});
	$(opts.form.fields.tradingPassword).rules("add", { required: true});
	
};

/*************************************************************************************
* remove error message of validation
**************************************************************************************/
OSCClazzChangeInternetEmail.prototype.removeValidation = function() {
	var _this = this;
	var opts = _this.getOption();
	
	// remove error message of validation
	_this.validator = $(opts.form.name).validate({debug: false});
	_this.validator.prepareForm();
	_this.validator.hideErrors();
	_this.validator.elements().removeClass(_this.validator.settings.errorClass );
	
};

/*************************************************************************************
* resetInitData functionality
**************************************************************************************/
OSCClazzChangeInternetEmail.prototype.resetInitData = function() {
	var _this = this;
	_this.validator = null;
};

/*************************************************************************************
*** check valid form function
**************************************************************************************/
OSCClazzChangeInternetEmail.prototype.validForm = function() {
	var _this = this;
	var opts = _this.getOption();
	return $(opts.form.name).valid();
};

/*************************************************************************************
*** execute function
**************************************************************************************/
OSCClazzChangeInternetEmail.prototype.execute = function() {
	var _this = this;
	var opts = _this.getOption();
	
	var fValid = $(opts.form.name).valid();

	if(fValid) {
		var options = { 	         
	        beforeSubmit:  _this.execute_PreSubmit,  // pre-submit callback 
	        success:       _this.execute_PostSubmit,  // post-submit callback        
	 
	        // other available options: 
	        //url :
	        type:      'post',        // 'get' or 'post', override for form's 'method' attribute 
	        dataType:  'json'        // 'xml', 'script', or 'json' (expected server response type)        
	        //clearForm: true        // clear all form fields after successful submit 
	        //resetForm: true        // reset the form after successful submit 
	 		//iframe: false
	 		
	        // $.ajax options can be used here too, for example: 
	        //timeout:   3000 
	    }; 
	    // inside event callbacks 'this' is the DOM element so we first 
	    // wrap it in a jQuery object and then invoke ajaxSubmit      	
		$(opts.form.name).ajaxSubmit(options);
	}
    // !!! Important !!! 
    // always return false to prevent standard browser submit and page navigation 
    return false;
};

/*************************************************************************************
* execute_PreSubmit function
*
* pre-submit callback
* formData is an array; here we use $.param to convert it to a string to display it 
* but the form plugin does this for you automatically when it submits the data 
* var queryString = $.param(formData);
*
* jqForm is a jQuery object encapsulating the form element.  To access the 
* DOM element for the form do this: 
* var formElement = jqForm[0];
*
* here we could return false to prevent the form from being submitted; 
* returning anything other than false will allow the form submit to continue 
*************************************************************************************/ 
OSCClazzChangeInternetEmail.prototype.execute_PreSubmit = function(formData, jqForm, options) {
	var opts = $.changeInternetEmailOption;
	var _this = opts.clazzHandler;	
	
	$.web_message.clear();
	_this.removeValidation();
	
	//+++ show loading image
	$(opts.loading).web_showLoading();
	//---
		
	var queryString = $.param(formData); 
	    
    // here we could return false to prevent the form from being submitted; 
    // returning anything other than false will allow the form submit to continue 
    return true;
};

/*************************************************************************************
* execute_PostSubmit function
*
* post-submit callback
* for normal html responses, the first argument to the success callback 
* is the XMLHttpRequest object's responseText property 
*  
* if the ajaxForm method was passed an Options Object with the dataType 
* property set to 'xml' then the first argument to the success callback 
* is the XMLHttpRequest object's responseXML property 
* 
* if the ajaxForm method was passed an Options Object with the dataType 
* property set to 'json' then the first argument to the success callback 
* is the json data object returned by the server
*
* @param : responseText is JSON data format 
{ "error" : { 
      "actionErrors" : [ "Có lỗi thực thi" ],
      "actionMessages" : [  ],
      "fieldErrors" : {  },
      "hasActionErrors" : true,
      "hasActionMessages" : false,
      "hasErrors" : true,
      "hasFieldErrors" : false
    },
  "model" : { 
      "post" : { 
         
        },
      "content" : { 

        }
    }
}*
*************************************************************************************/
OSCClazzChangeInternetEmail.prototype.execute_PostSubmit = function(responseText, statusText) {
	var opts = $.changeInternetEmailOption;
	var _this = opts.clazzHandler;
	//+++ hidden loading image
	$(opts.loading).web_hiddenLoading();
	//---

	if(responseText.error !== null && responseText.error !== 'undefined' && responseText.error.hasErrors) {						
		$.web_message.error(_this.validator, responseText.error);
		try {
			if($.isFunction(opts.func.callbackExecuteFail)) {
				opts.func.callbackExecuteFail();
			}
		} catch (e) {			
		}			
	} else {
		if($.isFunction(opts.func.callbackExecuted)) {
			opts.func.callbackExecuted();
		}
		$.web_message.actionMsg(responseText.error);

		var model = responseText.model;
		
		$(opts.form.fields.eEmail).html(model.onlineUser.email);
		$(opts.form.fields.newEmail).val("");
		// update cache data
		$(opts.form.fields.cacheData).val(model.cacheData);
	}
};


