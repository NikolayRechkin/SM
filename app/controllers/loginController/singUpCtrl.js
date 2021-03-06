/**
 * Created by Nikcher on 19.03.2017.
 */
module.exports = function (ngModule) {
    ngModule.controller('singUpCtrl',function ($rootScope,$scope, validationService,saltService) {
        var formValid;

        /*==========INPUTS===========*/
        if($('.bs-float-label input').length){
            var bs_float_on_class = "on";
            var bs_float_show_class = "show";

            $('.float-input').on('bs-check-value', function(){
                var _bs_label = $(this).closest('.bs-float-label').find('.float-label');
                if (this.value !== ''){
                    _bs_label.addClass(bs_float_show_class);
                } else {
                    _bs_label.removeClass(bs_float_show_class);
                }
            })
                .on("keyup",function(){
                    $(this).trigger("bs-check-value");
                    var formGroup = $(this).parents('.form-group');
                    var glyphicon = formGroup.find('.form-control-feedback');
                    if(!!this.value){
                        validationService.resetValidationError(formGroup,glyphicon);
                    }else{
                        validationService.showValidationError(formGroup,glyphicon);
                    }
                })
                .on("focus",function(){
                    $(this).closest(".bs-float-label").find('.float-label').addClass(bs_float_on_class);
                    $(this).closest(".bs-float-label").find('.input-group-addon').addClass("select-label");
                })
                .on("blur",function(){
                    $(this).closest(".bs-float-label").find('.float-label').removeClass(bs_float_on_class);
                    $(this).closest(".bs-float-label").find('.input-group-addon').removeClass("select-label");
                }).trigger("bs-check-value");
        }
        /*========================================*/

        /*
        * ===============LOGIN==============*/
        $scope.singUp = function (login,password) {

            formValid = true;
            $('#loginBtn').focus();
            $('.error-validation').each(function () {
                this.remove();
            });

            var formGroup = $('.form-group.password-field-form');
            var glyphicon = formGroup.find('.form-control-feedback');
            validationService.resetLoginError(formGroup,glyphicon);

            if(typeof (login) === 'undefined' || !login){
                formValid = false;
                var formGroup = $('.form-group.login-field-form');
                var glyphicon = formGroup.find('.form-control-feedback');
                var errorMessage = "Введите логин";
                validationService.showValidationError(formGroup,glyphicon,errorMessage);
                formGroup = glyphicon = errorMessage = null;
            }else {
                var formGroup = $('.form-group.login-field-form');
                var glyphicon = formGroup.find('.form-control-feedback');

                validationService.resetValidationError(formGroup,glyphicon);
                formGroup = glyphicon = null;
            }
            if(typeof (password) === 'undefined' || !password){
                formValid = false;
                var formGroup = $('.form-group.password-field-form');
                var glyphicon = formGroup.find('.form-control-feedback');

                var errorMessage = "Введите пароль";
                validationService.showValidationError(formGroup,glyphicon,errorMessage);
                formGroup = glyphicon = errorMessage = null;
            }else {
                var formGroup = $('.form-group.password-field-form');
                var glyphicon = formGroup.find('.form-control-feedback');

                validationService.resetValidationError(formGroup,glyphicon);
                formGroup = glyphicon = null;
            }

            if(formValid){
                saltService.toSalt(login,password);
                //TODO sent to service
            }
        }
        //===============================================

    })
};
