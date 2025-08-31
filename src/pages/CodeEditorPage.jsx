import React, { useState } from 'react';
import Layout from '../components/Layout';
import CodeEditor from '../components/CodeEditor';

const LANGUAGES = ['javascript', 'python', 'java', 'cpp', 'bash', 'go'];

const DEFAULT_SNIPPETS = {
    javascript: `console.log("Hello, World!");`,
    python: `print("Hello, World!")`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    bash: `echo "Hello, World!"`,
    go: `package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}`,
};

const CodeEditorPage = () => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState(DEFAULT_SNIPPETS['javascript']);
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLanguageChange = (e) => {
        const selected = e.target.value;
        setLanguage(selected);
        // set default snippet for the selected language
        setCode(DEFAULT_SNIPPETS[selected] ?? '// Type your code here');
    };

    const handleRun = async () => {
        setIsLoading(true);
        setOutput('');
        try {
            const res = await fetch('http://localhost:8080/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language, code }),
            });
            const data = await res.json();
            setOutput(data.output ?? data.error ?? 'No output');
        } catch (err) {
            setOutput(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-6">Interactive Code Editor</h1>

                <div className="flex gap-4 items-center mb-4">
                    <label className="font-medium">Language:</label>
                    <select value={language} onChange={handleLanguageChange} className="p-2 border rounded">
                        {LANGUAGES.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>

                {/* key={language} forces remount if necessary (safe fallback) */}
                <CodeEditor key={language} language={language} code={code} onChange={setCode} />

                <div className="flex gap-4 mt-4 items-center">
                    <button
                        onClick={handleRun}
                        disabled={isLoading}
                        className={`mt-2 bg-lime-600 text-white py-2 px-6 rounded-md hover:bg-lime-700 transition ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Running...' : 'Run Code'}
                    </button>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-3">Output</h2>
                    <div className="bg-black text-lime-400 font-mono text-sm p-4 rounded-lg shadow-md min-h-[150px] overflow-auto whitespace-pre-wrap">
                        {output || 'Run your code to see output here...'}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CodeEditorPage;
