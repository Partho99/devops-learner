import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnsiToHtml from 'ansi-to-html';

const ansiConverter = new AnsiToHtml({ escapeXML: true, stream: true });

const cleanAnsi = (text) =>
    text
        .replace(/\x1b\[[0-9;]*[A-Za-z]/g, '')
        .replace(/\x1b\].*?\x07/g, '')
        .replace(/\x1b\[\?2004[hl]/g, '')
        .replace(/\r/g, '');

const WebTerminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to DevOps Learner Terminal!' },
        { type: 'output', content: 'Type your commands below.' },
    ]);
    const [connected, setConnected] = useState(false);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(null);

    const wsRef = useRef(null);
    const inputRef = useRef(null);
    const terminalRef = useRef(null);

    useEffect(() => {
        let connectedOnce = false;
        wsRef.current = new WebSocket('ws://localhost:8080/terminal');

        wsRef.current.onopen = () => {
            setConnected(true);
            connectedOnce = true;
            setHistory(prev => [...prev, { type: 'output', content: 'WebSocket connected!' }]);
            inputRef.current?.focus();
        };

        wsRef.current.onmessage = (event) => {
            const message = cleanAnsi(event.data);
            const html = ansiConverter.toHtml(message);
            setHistory(prev => [...prev, { type: 'ansi', content: html }]);
        };

        wsRef.current.onclose = () => {
            setConnected(false);
            if (connectedOnce) setHistory(prev => [...prev, { type: 'error', content: 'WebSocket disconnected.' }]);
        };

        wsRef.current.onerror = (err) => {
            console.error('WebSocket error:', err);
            if (connectedOnce) setHistory(prev => [...prev, { type: 'error', content: 'WebSocket error occurred.' }]);
        };

        return () => wsRef.current?.close();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setHistory(prev => [...prev, { type: 'input', content: `$ ${input}` }]);

        // Save to command history
        setCommandHistory(prev => [...prev, input]);
        setHistoryIndex(null);

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(input + '\n');
        } else {
            setHistory(prev => [...prev, { type: 'error', content: 'WebSocket not connected.' }]);
        }

        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length === 0) return;
            const newIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
            setInput(commandHistory[newIndex]);
            setHistoryIndex(newIndex);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (commandHistory.length === 0) return;
            if (historyIndex === null) return;
            const newIndex = historyIndex + 1;
            if (newIndex >= commandHistory.length) {
                setInput('');
                setHistoryIndex(null);
            } else {
                setInput(commandHistory[newIndex]);
                setHistoryIndex(newIndex);
            }
        }
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 rounded-lg shadow-lg overflow-hidden"
        >
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">
          DevOps Terminal {connected ? '(Connected)' : '(Connecting...)'}
        </span>
            </div>

            <div
                ref={terminalRef}
                className="h-96 overflow-y-auto p-4 font-mono text-sm cursor-text whitespace-pre-wrap text-white"
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((line, idx) => {
                    if (line.type === 'ansi') {
                        return <div key={idx} dangerouslySetInnerHTML={{ __html: line.content }} className="mb-1" />;
                    }
                    return (
                        <div
                            key={idx}
                            className={`mb-1 ${line.type === 'input' ? 'text-green-400' : line.type === 'error' ? 'text-red-400' : 'text-gray-300'}`}
                        >
                            {line.content}
                        </div>
                    );
                })}

                <form onSubmit={handleSubmit} className="flex items-center mt-1">
                    <span className="text-green-400 mr-2">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-white outline-none font-mono"
                        autoComplete="off"
                        spellCheck="false"
                        disabled={!connected}
                        placeholder={connected ? '' : 'Connecting...'}
                    />
                </form>
            </div>
        </motion.div>
    );
};

export default WebTerminal;
