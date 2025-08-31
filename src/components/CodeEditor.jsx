import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { motion } from "framer-motion";

// Language imports
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { StreamLanguage } from "@codemirror/language";
import { shell } from "@codemirror/legacy-modes/mode/shell";

const LANGUAGE_MAP = {
    javascript,
    python,
    java,
    cpp,
    go,
    bash: () => StreamLanguage.define(shell),
};

const CodeEditor = ({ language = "javascript", code = "", onChange }) => {
    const [value, setValue] = useState(code);

    const extension = LANGUAGE_MAP[language];

    const handleChange = (val) => {
        setValue(val);
        if (onChange) onChange(val);
    };

    return (
        <motion.div
            className="w-full rounded-md shadow-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <CodeMirror
                value={value}
                height="400px"
                theme="dark"
                extensions={extension ? [extension()] : []}
                onChange={handleChange}
            />
        </motion.div>
    );
};

export default CodeEditor;
