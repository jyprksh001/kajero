import { expect } from 'chai';
import Immutable from 'immutable';
import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import * as util from './util';

describe('util', () => {

    jsdom();

    describe('codeToText', () => {

        it('correctly transforms a code block to text', () => {
            const codeBlock = Immutable.fromJS({
                type: 'code',
                language: 'javascript',
                attrs: ['hidden'],
                content: 'return 1 + 2;'
            });
            const expected = '```javascript; hidden\nreturn 1 + 2;\n```';
            expect(util.codeToText(codeBlock)).to.equal(expected);
        });

    });

    describe('highlight', () => {

        it('correctly highlights code', () => {
            const expected = '<span class="hljs-built_in">console</span>' +
                '.log(<span class="hljs-string">"hello"</span>);';
            expect(util.highlight('console.log("hello");', 'javascript'))
                .to.equal(expected);
        });

        it('returns nothing for an unsupported language', () => {
            expect(util.highlight('rubbish', 'dfhjf')).to.equal('');
        });
    });

    describe('extractMarkdownFromHTML', () => {

        before(() => {
            sinon.stub(document, "getElementById").returns({
                text: '\n    ---\n    ---\n\n    ## This has spaces\n\n        Are they removed?'
            });
        });

        after(() => {
            document.getElementById.restore()
        });

        it('correctly removes indentation when loading Markdown from HTML', () => {
            const expected = '---\n---\n\n## This has spaces\n\n    Are they removed?';
            expect(util.extractMarkdownFromHTML()).to.equal(expected);
        });

    });

});
