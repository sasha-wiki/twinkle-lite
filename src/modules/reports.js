import * as utils from './utils';

let reportedUser = mw.config.get( "wgRelevantUserName" )

let listMotiveOptions = [
    {value: "VDE", label: "Violación de etiqueta"},
    {value: "3RR", label: "Guerra de ediciones"},
    {value: "NI", label: "Nombre inapropiado"},
    {value: "VEC", label: "Vandalismo en curso"},
    {value: "VP", label: "Vandalismo persistente"},
    {value: "CCPV", label: "Cuenta creada para vandalizar"},
    {value: "EDB", label: "Evasión de bloqueo"},
    {value: "O", label: "Otro"}
]

function getMotiveOptions() {
        let dropDownOptions = [];
        for (let motive of listMotiveOptions) {
            let option = {value: motive.value, label: motive.label, subgroup: motive.subgroup };
            dropDownOptions.push(option);
        }
        return dropDownOptions;
}

function createFormWindow() {
	let Window = new Morebits.simpleWindow(620, 530);
	Window.setTitle('Denunciar usuario');
	Window.addFooterLink('Tablón de anuncios de los bibliotecarios', 'Wikipedia:Tablón de anuncios de los bibliotecarios');
	let form = new Morebits.quickForm(submitMessage);

    let reportTypeField = form.append({
        type: 'field',
        label: 'Opciones:',
    })
    reportTypeField.append({
        type: 'select',
        label: 'Selecciona el motivo:',
        name: 'motive',
        list: getMotiveOptions(),
    })

    let reportInfoField = form.append({
        type: 'field',
        label: 'Información:'
    })
    reportInfoField.append({
        type: 'dyninput',
        label: 'Nombre de usuario:',
        name: 'usernamefield',
        value: "",
        sublabel: 'prueba: ',
    })

	let result = form.render();
	Window.setContent(result);
	Window.display();

    document.querySelector('input[name="usernamefield"]').value = reportedUser
}

function submitMessage(e) {

	let form = e.target;
    let input = Morebits.quickForm.getInputData(form);
    console.log("testing stuff")
}




export { createFormWindow };