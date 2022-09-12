/**
 * Crea una instancia de FlashModal.
 * @param {string} idModal id del Modal.
 * @param {string} header encabezado del Modal.
 * @param {string} body cuerpo del Modal.
 * @param {string} footer footer del Modal.
 * @example  new FlashModal("servletPincipal",{id:213}).done(function(data){procesar(data)});
 * @version 1.0
 * @author Carlos Mejía
 */

class FlashModal {

    constructor(idModal, header, body, footer) {
        this.id = idModal;
        this.header = header;
        this.body = body;
        this.footer = footer;
        this.classModal = "flashModal";
        this.type = "basic";
        this.animation = "top";
        this.position = "top-center"
        this.size = "m";
        this.event = null;
        this.time = 0;
        this.buttonClose = null;
        this.modal = true;
    }

    setHeader(header) {
        this.animation = animation;
        return this;
    }

    setButtonClose(buttonClose){
        this.buttonClose = buttonClose;
        return this;
    }

    setSize(size) {
        this.size = size;
        return this;
    }

    setPosition(position) {
        this.position = position;
        return this;
    }

    setAnimation(animation) {
        this.animation = animation;
        return this;
    }
    
    setModal(modal){
       this.modal = modal;
       return this;
    }

    setClassModal(classModal) {
        this.classModal = classModal;
        return this;
    }

    setType(type){
        this.type = type;
        return this;
    }

    setTime(time) {
        this.time = time;
        return this;
    }

    addEvent(event, element) {
        var modal = this;
        document.querySelectorAll(element).forEach(function (ele) {
            ele.addEventListener(event, function (e) {
                modal.show();
            });

        });
        return modal;
    }

    show() {
        createModal(this);
        createContentModal(this);
    }

    close(){
        closeModal(document.querySelector("#" + this.id + " .flashModal-container").lastChild,this);
    }
}

function createModal(modal){

        if (document.querySelectorAll("#" + modal.id + "." + modal.classModal).length == 0) {
            var div = document.createElement("div");
            div.id = modal.id;
            div.classList.add(modal.classModal,"flashModal-hide");
            if (modal.modal){
                div.classList.add("flashModal-modal"); 
            }
            document.body.appendChild(div);
            var container = document.createElement("div");
            container.classList.add("flashModal-container", "flashModal-" + modal.size,"flashModal-" + modal.position);           
            document.getElementById(modal.id).appendChild(container);
        }

        if (document.getElementById(modal.id).classList.contains("flashModal-hide") && document.querySelector("#" + modal.id + " .flashModal-content") != null) {
            document.querySelector("#" + modal.id + " .flashModal-container").innerHTML = "";
        }

}

function createContentModal(modal) {

    var content = document.createElement("div");
    content.classList.add("flashModal-content", modal.classModal + "-" + modal.type, "flashModal-animate-" + modal.animation);
    document.querySelector("#" + modal.id + " .flashModal-container").appendChild(content);
    
    var header = document.createElement("div");
    header.classList.add("flashModal-header");
    header.innerHTML = modal.header;

    var body = document.createElement("div");
    body.classList.add("flashModal-body");
    body.appendChild(modal.body);
  
    var footer = document.createElement("div");
    footer.classList.add("flashModal-footer");
    footer.appendChild(modal.footer);

    //var footer = modal.footer != null ? createElement("div",[{class:"flashModal-footer"},{appendChild:modal.footer}]) : "";
    content.appendChild(header);
    content.appendChild(body);
    content.appendChild(footer);

    if (modal.buttonClose != null){
        createButtonClose(content,modal);
    }
    
    var container = document.querySelector("#" + modal.id + " .flashModal-container")
    container.appendChild(content);
    document.getElementById(modal.id).classList.replace("flashModal-hide", "flashModal-show");
    container.style.height = container.offsetHeight + "px";
   
    setTimeout(function(){
       loadScrollModal(modal);
    },350);

    if(modal.time > 0){
        timeModal(content,modal);
    }

}

function createButtonClose(content,modal){
    modal.buttonClose.addEventListener("click", function (e) {
        closeModal(content,modal);
    });
    content.appendChild(modal.buttonClose);
}

function timeModal(content, modal) {

    var time = setTimeout(function () {
         closeModal(content,modal);
    }, (modal.time * 1000));

    content.addEventListener("mouseover", function () {
        clearTimeout(time);
    });

    content.addEventListener("mouseleave", function () {
        timeModal(content,modal);
    });
}

function closeModal(content,modal){

    var container = document.querySelector("#" + modal.id + " .flashModal-container");
    container.style.height = container.offsetHeight + "px";

    content.classList.add("flashModal-animate-delete-" + modal.animation);
    
    setTimeout(function(){
        if (document.querySelectorAll("#" + modal.id + " .flashModal-content").length == 1){
            document.getElementById(modal.id).classList.replace("flashModal-show", "flashModal-hide");
        }
        content.remove();
        loadScrollModal(modal);
        
    },350);

}

function loadScrollModal(modal){

    var container = document.querySelector("#" + modal.id + " .flashModal-container");
    container.style.height = "auto";

    if (container.offsetHeight > window.innerHeight){
        container.style.height = "100%";
        container.style.setProperty("overflow-y","scroll");
    }
    else{
        container.style.height = "auto";
        container.style.setProperty("overflow-y",null);
    }

}

