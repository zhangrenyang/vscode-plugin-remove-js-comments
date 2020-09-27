const vscode = require('vscode');
function activate(context) {
	let disposable = vscode.commands.registerCommand('vscode-plugin-remove-comments.removeComments', function () {
		vscode.window.activeTextEditor.edit(editBuilder => {
			let text = vscode.window.activeTextEditor.document.getText();
			text=text.replace(/((\/\*([\w\W]+?)\*\/)|(\/\/(.(?!"\)))+)|(^\s*(?=\r?$)\n))/gm,'').replace(/(^\s*(?=\r?$)\n)/gm,'').replace(/\\n\\n\?/gm,'');
			const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
			editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
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
