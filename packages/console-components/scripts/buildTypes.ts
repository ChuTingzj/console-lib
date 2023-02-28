import {resolve, dirname} from 'path';
import {promises} from 'fs';
import {Project, type SourceFile} from 'ts-morph';
import glob from 'fast-glob';
(async () => {
	const sourceFiles: Array<SourceFile> = [];
	const files = await glob(['lib/*.ts', 'lib/**/*.tsx']);
	const project = new Project({
		compilerOptions: {
			declaration: true,
			emitDeclarationOnly: true,
			noEmitOnError: true,
			allowJs: true,
			outDir: './dist',
		},
		tsConfigFilePath: resolve(__dirname, '../tsconfig.json'),
		skipAddingFilesFromTsConfig: true,
	});
	Promise.all(
		files.map(async (file) => {
			sourceFiles.push(project.addSourceFileAtPath(file));
		})
	);
	const diagnostics = project.getPreEmitDiagnostics();
	console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));
	project.emitToMemory();
	for (const sourceFile of sourceFiles) {
		const emit = sourceFile.getEmitOutput();
		for (const outputFile of emit.getOutputFiles()) {
			const filePath = outputFile.getFilePath();
			await promises.mkdir(dirname(filePath), {recursive: true});
			await promises.writeFile(filePath, outputFile.getText(), 'utf8');
		}
	}
})();
