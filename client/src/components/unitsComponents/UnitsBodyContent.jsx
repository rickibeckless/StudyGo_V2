import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageTitle from "../PageTitle.jsx";
import LoadingScreen from "../LoadingScreen.jsx";
import MessagePopup from "../MessagePopup.jsx";

export default function UnitsBodyContent({ topic, currentSubTopic, subTopics }) {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            {message && <MessagePopup message={message} setMessage={setMessage} />}

            {currentSubTopic === 'notes' ? (
                topic.notes.map((note, index) => (
                    <ul className="note-holder">
                        <li key={index} className="note">{note}</li>
                    </ul>
                ))
            ) : currentSubTopic === 'terms_defs' ? (
                topic.terms_defs.map((term_def, index) => (
                    <ul className="termdef-holder">
                        <h4 key={index} className="term">{term_def.term}</h4>
                        <ul className="definition-holder">
                            {Array.isArray(term_def.definition) ? (
                                term_def.definition.map((definition, index) => (
                                    <li key={index} className="definition">
                                        <span className="definition-bullet">★</span>
                                        {definition}
                                    </li>
                                ))
                            ) : (
                                <li className="definition">
                                    <span className="definition-bullet">★</span>
                                    {term_def.definition}
                                </li>
                            )}
                        </ul>
                    </ul>
                ))
            ) : currentSubTopic ? (
                <div className="lesson-holder">
                    <h2 className="lesson-title">{currentSubTopic.name}</h2>
                    <p className="lesson-description">{currentSubTopic.description}</p>
                    <div className="lesson-content" dangerouslySetInnerHTML={{ __html: currentSubTopic.lesson_content }}></div>
                </div>
            ) : null 
            }
        </>
    );
};