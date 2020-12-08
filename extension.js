const vscode = require('vscode');
function activate(context) {
	let disposable = vscode.commands.registerCommand('vscode-plugin-remove-comments.removeJSComments', function () {
		vscode.window.activeTextEditor.edit(editBuilder => {
			let text = vscode.window.activeTextEditor.document.getText();
			text =text.replace(/^\/\*(.|[\r\n])+?\*\//g,'');//remove multiline comment
			text =text.replace(/(^|\s)\/\/.+/g,'');//remove Single-Line Comments
			text =text.replace(/\s+\/\*.+\*\//g,'');//remove multiline comment in line
			const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
			editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
			vscode.commands.executeCommand(`editor.action.formatDocument`);
			vscode.window.activeTextEditor;
		});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
