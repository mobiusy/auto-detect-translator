import * as ts from 'typescript';
import * as fs from 'fs';

// 读取文件内容
const filePath = '/data/github/auto-detect-translator/src/test/demo.ts';
const sourceCode = fs.readFileSync(filePath, 'utf-8');

// 创建 SourceFile 对象
const sourceFile = ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.Latest, true);

// 遍历节点并提取注释和字符串
function extractCommentsAndStrings(node: ts.Node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        console.log('String:', node.text);
    }

    const comments = ts.getLeadingCommentRanges(sourceCode, node.pos) || [];
    comments.forEach(comment => {
        const commentText = sourceCode.substring(comment.pos, comment.end);
        console.log('Comment:', commentText);
    });

    ts.forEachChild(node, extractCommentsAndStrings);
}

// 开始遍历 AST
extractCommentsAndStrings(sourceFile);
