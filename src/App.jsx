import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const newFeedback = { name, email, message, timestamp: new Date().toLocaleString() };

    setLoading(true);
    try {
      const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
      storedFeedbacks.push(newFeedback);
      localStorage.setItem('feedbacks', JSON.stringify(storedFeedbacks));
      form.reset();
      fetchFeedbacks();
      setMessage('Feedback submitted successfully');
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Submit error:', err);
      setMessage('Error submitting feedback');
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbacks = () => {
    try {
      const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
      setFeedbacks(storedFeedbacks);
    } catch (err) {
      console.error('Fetch error:', err);
      setFeedbacks([]);
    }
  };

  const clearFeedbacks = () => {
    localStorage.removeItem('feedbacks');
    setFeedbacks([]);
    setMessage('Feedback cleared successfully');
    setTimeout(() => setMessage(null), 3000);
  };

  const lightBg = "url('https://applescoop.org/image/wallpapers/mac/very-light-color-abstract-soft-gradient-04-10-2024-1728095548-hd-wallpaper.jpg')";
  const darkBg = "url('https://wallpaperbat.com/img/99008967-clean-pc-wallpaper.jpg')";

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed font-[Quicksand] flex items-center justify-center px-4 py-8 transition-all duration-300"
      style={{ backgroundImage: theme === 'dark' ? darkBg : lightBg }}
    >
      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500/20 border border-green-500/30 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out">
          {message}
        </div>
      )}

      <div className={`
        backdrop-blur-lg border rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg transition-all duration-300
        ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white' : 'bg-[#f5f5dc] border-black/10 text-black'}
      `}>
        
        {/* Header + Toggle in one row and centered */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <h1 className="text-3xl font-bold drop-shadow-lg text-center">Feedback Collector</h1>
          <button onClick={toggleTheme} className="text-2xl hover:scale-110 transition">
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'message'].map((field, i) => (
            <div key={i}>
              <label className="block text-sm mb-1 capitalize">{field === 'message' ? 'Feedback' : field}</label>
              {field !== 'message' ? (
                <input
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  required
                  className={`
                    w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition
                    ${theme === 'dark'
                      ? 'bg-white/10 border border-white/30 text-white placeholder-white/70 focus:ring-white/40'
                      : 'bg-white border border-black/30 text-black placeholder-black/50 focus:ring-black/30'}
                  `}
                  placeholder={field === 'name' ? 'DeVen' : field === 'email' ? 'dev@example.com' : ''}
                />
              ) : (
                <textarea
                  name="message"
                  rows="4"
                  required
                  className={`
                    w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition
                    ${theme === 'dark'
                      ? 'bg-white/10 border border-white/30 text-white placeholder-white/70 focus:ring-white/40'
                      : 'bg-white border border-black/30 text-black placeholder-black/50 focus:ring-black/30'}
                  `}
                  placeholder="Write your feedback here..."
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-2 rounded-md transition disabled:opacity-50 font-semibold
              ${theme === 'dark'
                ? 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                : 'bg-[#8a8686] text-white border border-[#807c7c] hover:bg-[#232020]'}
            `}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              const next = !showFeedbacks;
              setShowFeedbacks(next);
              if (next) fetchFeedbacks();
            }}
            className="text-sm hover:underline transition"
          >
            {showFeedbacks ? 'Hide' : 'View'} Submitted Feedback
          </button>
        </div>

        {showFeedbacks && (
          <div className="mt-4 space-y-3 max-h-64 overflow-y-auto pr-1">
            <div className="flex justify-end mb-2">
              <button
                onClick={clearFeedbacks}
                className="px-4 py-1 bg-red-500/20 text-white border border-red-500/30 rounded-md hover:bg-red-500/30 transition text-sm font-semibold"
              >
                Clear All Feedback
              </button>
            </div>
            {feedbacks.length === 0 ? (
              <p className="text-center">No feedback submitted yet.</p>
            ) : (
              feedbacks.map((fb, idx) => (
                <div key={idx} className="p-3 rounded-md bg-white/10 border border-white/20">
                  <p className="font-semibold">
                    {fb.name} <span className="text-white/60">({fb.email})</span>
                  </p>
                  <p className="text-sm text-white/80">{fb.message}</p>
                  <p className="text-xs text-white/50 mt-1">{fb.timestamp}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-6 py-2 rounded-full text-white text-xs sm:text-sm backdrop-blur-md border border-white/20 shadow-md hover:shadow-lg transition-all text-center whitespace-nowrap z-50">
        © 2025 Rosn — Feedback Collector Submission
      </footer>
    </div>
  );
}

export default App;
