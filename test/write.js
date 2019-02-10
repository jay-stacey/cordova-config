import test from 'ava';
import fs from 'fs-extra';
import tempy from 'tempy';
import Config from '..';

test.beforeEach(t => {
	t.context.tmp = tempy.file({extension: '.xml'});

	fs.copySync('test/fixtures/config.empty.xml', t.context.tmp);
});

test('write', async t => {
	const config = new Config(t.context.tmp);
	config.setName('Hello World');
	config.setDescription('This is my description');

	await config.write();

	t.is(fs.readFileSync(t.context.tmp, 'utf8'), [
		`<?xml version='1.0' encoding='utf-8'?>`, // eslint-disable-line quotes
		'<widget id="cordova-config" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">',
		'    <name>Hello World</name>',
		'    <description>This is my description</description>',
		'</widget>',
		''
	].join('\n'));
});

test('writeSync', t => {
	const config = new Config(t.context.tmp);
	config.setName('Hello World');
	config.setDescription('This is my description');

	config.writeSync();

	t.is(fs.readFileSync(t.context.tmp, 'utf8'), [
		`<?xml version='1.0' encoding='utf-8'?>`, // eslint-disable-line quotes
		'<widget id="cordova-config" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">',
		'    <name>Hello World</name>',
		'    <description>This is my description</description>',
		'</widget>',
		''
	].join('\n'));
});
