import { motion, AnimatePresence } from 'framer-motion';

const SunIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>);
const MoonIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>);

export const Header = ({ onGenerateArray, onStop, onRunSort, onSetArraySize, onSetAnimationSpeed, onToggleDarkMode, algorithms, isSorting, isPostSortDelay, isDarkMode, arraySize, maxArraySize, animationSpeed, activeAlgorithm, isSorted, }) => {
    const controlsDisabled = isSorting || isPostSortDelay;

    return (
        <motion.header layout className="header">
            <div className="header-content">
                <div className="header-section left">
                    <a href="https://github.com/soumil1/Sortify-Algorithm-Visualizer" target="_blank" rel="noopener noreferrer" className="sortify-title">
                        Sortify
                    </a>
                    <div className="controls-group">
                        <div className="algo-button-wrapper">
                            <button onClick={onGenerateArray} disabled={controlsDisabled} className="button">New Array</button>
                        </div>
                        <AnimatePresence>
                            {isSorting && (
                                <motion.div
                                    className="algo-button-wrapper"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <button onClick={onStop} className="button stop-btn">Stop</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="header-section center">
                    <div className="controls-group">
                        {algorithms.map(algo => (
                            <div key={algo.name} className="algo-button-wrapper">
                                <button onClick={() => onRunSort(algo.name, algo.func)} disabled={controlsDisabled} className={`button ${activeAlgorithm === algo.name && (isSorting || isSorted) ? 'active' : ''}`}>
                                    {algo.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="header-section right">
                    <div className="controls-group">
                        <div className="slider-group">
                            <label htmlFor="size-slider">Size: {arraySize}</label>
                            <input id="size-slider" type="range" min="10" max={maxArraySize} value={arraySize} onChange={(e) => onSetArraySize(Number(e.target.value))} disabled={controlsDisabled} className="slider" />
                        </div>
                        <div className="slider-group">
                            <label htmlFor="speed-slider">Speed: {animationSpeed}</label>
                            <input id="speed-slider" type="range" min="10" max="99" value={animationSpeed} onChange={(e) => onSetAnimationSpeed(Number(e.target.value))} disabled={controlsDisabled} className="slider" />
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={isDarkMode} onChange={onToggleDarkMode} />
                            <span className="slider"><SunIcon className="sun-icon" /><MoonIcon className="moon-icon" /></span>
                        </label>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};
