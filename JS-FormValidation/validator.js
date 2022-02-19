// Đối tượng `Validator`
function Validator(options){
    // Vòng lặp tìm form group
    function getParent(element, selector){
        while (element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element=element.parentElement;
        }
    }

    var selectorRules={};

    // Hàm thực hiện validate
    function validate(inputElement, rule){
        // value: inputElement.value
        // test func: rule.test
        var errorMessage;
        var errorElement=getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

        // Lấy ra rule của selector
        var rules=selectorRules[rule.selector];
        // Lặp qua từng rule & kiểm tra
        for (var i=0; i<rules.length; ++i){
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage=rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    )
                    break;
                default: 
                    errorMessage= rules[i](inputElement.value);

            }
            if (errorMessage) break;
        }

        if(errorMessage){
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        }
        else{
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement=document.querySelector(options.form);
    if(formElement){
        // Khi submit form
        formElement.onsubmit= function(e){
            e.preventDefault();

            var isFormValid=true;
            // Thực hiện lặp qua từng rule và validate
            options.rules.forEach(function (rule){
                var inputElement= formElement.querySelector(rule.selector);
                var isValid=validate(inputElement, rule)
                if(!isValid){
                    isFormValid=false;
                }
            });
            if(isFormValid){
                // Trường hợp submit dùng js
                if(typeof options.onsubmit==='function'){
                    var enableInput=formElement.querySelectorAll('[name]:not([disable])')
                    var fomrValues=Array.from(enableInput).reduce(function(values, input){
                        switch(input.type){
                            case 'checkbox':
                                if (input.matches(':checked')) {
                                    if (!Array.isArray(values[input.name])) {
                                        values[input.name] = [];
                                    }
                                    values[input.name].push(input.value);
                                } else if (!values[input.name]) {
                                    values[input.name] = '';
                                }
                                break;
                            case 'radio':
                                values[input.name]=formElement.querySelector('input[name="'+ input.name +'"]:checked').value;
                                break;
                            case 'file':
                                values[input.name]=input.files;
                                break;
                            default:
                                values[input.name]=input.value;
                        }
                        return values;
                    }, {});
                    options.onsubmit(fomrValues)
                }
                // submit với hành vi mặc định
                else{
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý
        options.rules.forEach(function (rule){

            // Lưu lại các rules cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }else{
                selectorRules[rule.selector]=[rule.test];
            }

            var inputElements= formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function(inputElement){
                var errorElement= getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

                // Xử lý trường hợp blur khỏi input
                inputElement.onblur= function(){
                    validate(inputElement, rule);
                }

                // Xử lý trường hợp người dùng chọn vào ô không có giá trị ở select
                inputElement.onchange = function(){
                    if(formElement.querySelector(rule.selector).value===''){
                        validate(inputElement,rule);
                    }else{
                        // errorSelector.innerHTML='';
                        getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                    }
                }

                // Xử lý khi ng dùng nhập vào input
                inputElement.oninput = function(){
                    
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
                
                
            });

        });
    }
};

// Định nghĩa các rules
// 1. Khi có lỗi => trả lại message lỗi
// 2. Khi hợp lệ => Không trả cái gì
Validator.isRequired = function(selector, message){
    return {
        selector: selector, 
        test: function(value){
            //Kiểm tra xem người dùng đã nhập chưa 
            if(typeof value === 'string'){
                return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
            }
            return value ? undefined : message || 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail=function (selector, message){
    return{
        selector: selector,
        test: function(value){
            var regex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            return regex.test(value)? undefined: message || 'Vui lòng nhập Email';
        }
    };
}

Validator.minLength = function (selector, min){
    return{
        selector:selector,
        test: function(value){
            return value.length >= min ?undefined: `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message){
    return{
        selector:selector,
        test: function(value){
            
            return value=== getConfirmValue()? undefined: message||'Giá trị nhập vào không chính xác';
        }
    }

}
