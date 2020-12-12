const vscode = require('vscode');
function activate(context) {
	let disposable = vscode.commands.registerCommand('rm-js-comment.format', function () {
		vscode.window.activeTextEditor.edit(editBuilder => {
			let text = vscode.window.activeTextEditor.document.getText();
			text =text.replace(/\/\*(?!#)([\s\S\r])+?\*\//mg,'');//remove multiline comment
			text =text.replace(/(^|\s)\/\/.+/mg,'');//remove Single-Line Comments
			const {replacer={}} = vscode.workspace.getConfiguration("rm-js-comment");
			for(let oldVal in replacer){//apply use settings replacer
				text =text.replace(new RegExp(oldVal,'mg'),replacer[oldVal]);
			}
			text =text.replace(/(^\s*(?=\r?$)\n)/gm,'').replace(/\\n\\n\?/gm,'');//remove empty lines
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
