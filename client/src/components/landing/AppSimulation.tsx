import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, MapPin, X, Heart, Check, Loader2, DollarSign, ArrowRightLeft, CreditCard, Plus, Image as ImageIcon, Mic, ChevronLeft, Info, Send } from "lucide-react";
import confetti from "canvas-confetti";

// Mock Data
const DESTINATIONS = [
  {
    id: 1,
    name: "Tulum, Mexico",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop",
    price: "$1,200",
    tags: ["Beach", "Party", "Relax"]
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    price: "$1,800",
    tags: ["Culture", "Food", "Scenic"]
  },
  {
    id: 3,
    name: "Reykjavik, Iceland",
    image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2159&auto=format&fit=crop",
    price: "$2,100",
    tags: ["Adventure", "Nature", "Cold"]
  },
  {
    id: 4,
    name: "Amalfi Coast, Italy",
    image: "https://images.unsplash.com/photo-1633321088355-d0f8c1eaad48?q=80&w=2070&auto=format&fit=crop",
    price: "$2,500",
    tags: ["Luxury", "Views", "Food"]
  }
];

// Mock Chat Messages for Voting Step
const MOCK_MESSAGES = [
  { user: "Sarah", avatar: "https://i.pravatar.cc/150?u=1", text: "Tulum looks insane! 😍", color: "bg-pink-100 text-pink-700" },
  { user: "Mike", avatar: "https://i.pravatar.cc/150?u=2", text: "Wait, Japan is actually in budget?", color: "bg-blue-100 text-blue-700" },
  { user: "Jess", avatar: "https://i.pravatar.cc/150?u=3", text: "I voted for Italy 🍝", color: "bg-green-100 text-green-700" },
  { user: "Alex", avatar: "https://i.pravatar.cc/150?u=4", text: "Team Tulum!!", color: "bg-orange-100 text-orange-700" }
];

interface Expense {
  title: string;
  payer: string;
  amount: number;
  icon: string;
}

// Mock Expenses Data keyed by Destination ID
const MOCK_EXPENSES: Record<number, Expense[]> = {
  1: [ // Tulum
    { title: "Villa Deposit", payer: "Sarah", amount: 1200, icon: "🏠" },
    { title: "Beach Club Cabana", payer: "Mike", amount: 450, icon: "🍹" },
    { title: "Tacos & Cervezas", payer: "You", amount: 85, icon: "🌮" },
    { title: "Van Rental", payer: "Jess", amount: 320, icon: "🚐" },
  ],
  2: [ // Kyoto
    { title: "Ryokan Booking", payer: "Sarah", amount: 1800, icon: "🏯" },
    { title: "Omakase Dinner", payer: "Mike", amount: 600, icon: "🍣" },
    { title: "Bullet Train Pass", payer: "You", amount: 400, icon: "🚅" },
    { title: "Tea Ceremony", payer: "Jess", amount: 120, icon: "🍵" },
  ],
  3: [ // Reykjavik
    { title: "4x4 Rental", payer: "Mike", amount: 900, icon: "🚙" },
    { title: "Blue Lagoon Tickets", payer: "Sarah", amount: 300, icon: "💧" },
    { title: "Cabin Airbnb", payer: "Jess", amount: 1100, icon: "🏡" },
    { title: "Grocery Haul", payer: "You", amount: 250, icon: "🛒" },
  ],
  4: [ // Amalfi
    { title: "Cliffside Villa", payer: "Sarah", amount: 2200, icon: "🍋" },
    { title: "Boat Rental", payer: "Mike", amount: 800, icon: "🚤" },
    { title: "Pasta Making Class", payer: "You", amount: 300, icon: "🍝" },
    { title: "Limoncello Tasting", payer: "Jess", amount: 150, icon: "🥂" },
  ]
};

// Mock Data
const INITIAL_CHAT_MESSAGES = [
  { user: "Sarah", avatar: "https://i.pravatar.cc/150?u=1", text: "Guys, summer trip? ☀️", color: "bg-gray-200 text-black", isMe: false },
  { user: "Mike", avatar: "https://i.pravatar.cc/150?u=2", text: "I'm down! Mexico?? 🌮", color: "bg-gray-200 text-black", isMe: false },
  { user: "Jess", avatar: "https://i.pravatar.cc/150?u=3", text: "I want Italy for the vibes 🍝🇮🇹", color: "bg-gray-200 text-black", isMe: false },
  { user: "Sarah", avatar: "https://i.pravatar.cc/150?u=1", text: "Italy is expensive tho... my budget is tight.", color: "bg-gray-200 text-black", isMe: false },
  { user: "You", avatar: "https://i.pravatar.cc/150?u=5", text: "What's the max budget everyone is comfortable with?", color: "bg-blue-500 text-white", isMe: true },
  { user: "Mike", avatar: "https://i.pravatar.cc/150?u=2", text: "Maybe $1.5k max for flights + hotel?", color: "bg-gray-200 text-black", isMe: false },
  { user: "Jess", avatar: "https://i.pravatar.cc/150?u=3", text: "Ugh, fine. But I want a boat day 🚤", color: "bg-gray-200 text-black", isMe: false },
  { user: "You", avatar: "https://i.pravatar.cc/150?u=5", text: "We can split the boat! I'll put it on my card if you guys Venmo me.", color: "bg-blue-500 text-white", isMe: true },
  { user: "Sarah", avatar: "https://i.pravatar.cc/150?u=1", text: "Who is booking the Airbnb?? I don't want to chase people for money.", color: "bg-gray-200 text-black", isMe: false },
  { user: "Mike", avatar: "https://i.pravatar.cc/150?u=2", text: "Not it 🙅‍♂️", color: "bg-gray-200 text-black", isMe: false },
  { user: "Jess", avatar: "https://i.pravatar.cc/150?u=3", text: "Can we decide on a place first?? Tulum or Amalfi?", color: "bg-gray-200 text-black", isMe: false },
  { user: "You", avatar: "https://i.pravatar.cc/150?u=5", text: "This is chaos. We need to vote.", color: "bg-blue-500 text-white", isMe: true },
  { user: "Sarah", avatar: "https://i.pravatar.cc/150?u=1", text: "And figure out dates! June 15 or July 2??", color: "bg-gray-200 text-black", isMe: false },
];

export function AppSimulation() {
  const [step, setStep] = useState<"chat" | "selecting" | "scanning" | "setup" | "swipe" | "voting" | "result" | "split">("chat");
  const [tripDetails, setTripDetails] = useState({ name: "", budget: [1500] });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedDestinations, setLikedDestinations] = useState<number[]>([]);
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null);
  const [analyzedMessages, setAnalyzedMessages] = useState<number[]>([]);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Initial Chat Logic
  const [chatMessages, setChatMessages] = useState<typeof INITIAL_CHAT_MESSAGES>([]);
  
  useEffect(() => {
    if (step === "chat") {
      let msgIndex = 0;
      setChatMessages([]); // Reset messages when entering chat step
      
      const interval = setInterval(() => {
        // Use functional state update to ensure we don't depend on stale closures
        // but here we depend on msgIndex which is local to the effect.
        if (msgIndex < INITIAL_CHAT_MESSAGES.length) {
          const nextMsg = INITIAL_CHAT_MESSAGES[msgIndex];
          if (nextMsg) {
             setChatMessages(prev => [...prev, nextMsg]);
          }
          msgIndex++;
        } else {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Scanning Logic
  useEffect(() => {
    if (step === "scanning") {
      // Auto-analyze selected messages one by one
      // We don't really need to track 'analyzedMessages' state array for visual effect in the new design 
      // as much as just waiting for a timer, but let's keep the timer for the transition.
      
      const scanInterval = setTimeout(() => {
          setStep("setup");
      }, 2500); // 2.5 seconds scanning
      
      return () => clearTimeout(scanInterval);
    }
  }, [step]);

  // Setup Step
  const handleStart = () => {
    if (tripDetails.name) setStep("swipe");
  };

  // Swipe Logic
  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setLikedDestinations([...likedDestinations, DESTINATIONS[currentIndex].id]);
    }
    
    setDragDirection(direction);
    
    setTimeout(() => {
      setDragDirection(null);
      if (currentIndex < DESTINATIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setStep("voting");
      }
    }, 200);
  };

  // Simulation of "Group Voting"
  const [votingProgress, setVotingProgress] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<typeof MOCK_MESSAGES>([]);
  
  useEffect(() => {
    if (step === "voting") {
      const interval = setInterval(() => {
        setVotingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStep("result");
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#F97316', '#FB923C', '#FDBA74']
              });
            }, 500);
            return 100;
          }
          return prev + 1; // Slowed down slightly for realism
        });
      }, 30);

      // Simulate chat messages popping up
      let msgIndex = 0;
      const msgInterval = setInterval(() => {
        if (msgIndex < MOCK_MESSAGES.length) {
          setVisibleMessages(prev => [...prev, MOCK_MESSAGES[msgIndex]]);
          msgIndex++;
        } else {
          clearInterval(msgInterval);
        }
      }, 800);

      return () => {
        clearInterval(interval);
        clearInterval(msgInterval);
      };
    }
  }, [step]);

  // Budget Emoji Logic
  const getBudgetEmoji = (amount: number) => {
    if (amount < 1000) return "💸";
    if (amount < 2500) return "💰";
    if (amount < 4000) return "💳";
    return "💎";
  };

  const currentDestinationId = likedDestinations[0] ?? 1;
  const currentExpenses = MOCK_EXPENSES[currentDestinationId] ?? MOCK_EXPENSES[1];

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative">
      <AnimatePresence mode="wait">
        
        {/* STEP 0: INITIAL GROUP CHAT - iMessage Style */}
        {step === "chat" && (
           <motion.div 
             key="chat"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, y: -20 }}
             className="flex flex-col h-full bg-white font-sans"
           >
              {/* iMessage Header */}
              <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between p-3 pt-6 z-10 sticky top-0">
                 <div className="flex items-center text-blue-500 -ml-1">
                    <ChevronLeft size={24} />
                    <span className="text-sm">99+</span>
                 </div>
                 
                 <div className="flex flex-col items-center">
                    <div className="flex -space-x-1 mb-1">
                        <img src="https://i.pravatar.cc/150?u=1" className="w-8 h-8 rounded-full border-2 border-white" />
                        <img src="https://i.pravatar.cc/150?u=3" className="w-8 h-8 rounded-full border-2 border-white" />
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                          +2
                        </div>
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium">Summer Plans ☀️ <ChevronRight size={10} className="inline opacity-50"/></div>
                 </div>

                 <div className="w-8 flex justify-end">
                    {/* Placeholder for symmetry or icons like FaceTime */}
                 </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-2 overflow-y-auto bg-white">
                 <div className="text-center text-[10px] text-gray-400 font-medium my-4">iMessage</div>
                 <AnimatePresence>
                   {chatMessages.map((msg, i) => (
                      msg && (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} mb-2`}
                      >
                         {!msg.isMe && i > 0 && chatMessages[i-1]?.user !== msg.user && (
                            <div className="text-[10px] text-gray-400 ml-3 mb-1">{msg.user}</div>
                         )}
                         
                         <div className={`
                            max-w-[75%] px-4 py-2 text-[15px] leading-snug
                            ${msg.isMe 
                              ? 'bg-[#007AFF] text-white rounded-[20px] rounded-br-sm' 
                              : 'bg-[#E9E9EB] text-black rounded-[20px] rounded-bl-sm'}
                         `}>
                            {msg.text}
                         </div>
                      </motion.div>
                      )
                   ))}
                 </AnimatePresence>
              </div>

              {/* iMessage Input Area */}
              <div className="p-3 pb-6 bg-white border-t border-gray-100 z-20">
                 {/* App Drawer (Animated - Vertical) */}
                 <AnimatePresence>
                   {isDrawerOpen && (
                     <motion.div
                       initial={{ opacity: 0, scale: 0.95, y: 20 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.95, y: 20 }}
                       className="absolute bottom-16 left-3 bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-[32px] p-2 z-50 w-[240px] max-h-[300px] overflow-hidden flex flex-col-reverse"
                     >
                        <div className="flex flex-col gap-1 p-1 max-h-[300px] overflow-y-auto no-scrollbar">
                          
                          {/* SideQuest App Item (with Spotlight) */}
                          <div className="relative group">
                              <button 
                                onClick={() => setStep("selecting")}
                                className="w-full flex items-center gap-3 p-2 hover:bg-gray-100/80 rounded-2xl transition-colors text-left relative z-10"
                              >
                                 <div className="w-12 h-12 bg-sq-primary rounded-[12px] flex items-center justify-center shadow-sm shrink-0">
                                    <MapPin className="text-white" size={20} />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-gray-900">SideQuest</span>
                                    <span className="text-[10px] text-gray-500">Plan trips together</span>
                                 </div>
                              </button>
                              
                              {/* Spotlight for SideQuest */}
                              <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)] z-20 pointer-events-none"
                              />
                          </div>

                          {/* GamePigeon */}
                          <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-100/80 rounded-2xl transition-colors text-left opacity-60 hover:opacity-100">
                             <div className="w-12 h-12 bg-green-500 rounded-[12px] flex items-center justify-center shadow-sm shrink-0">
                                <span className="text-white font-bold text-xs tracking-tighter">GAME</span>
                             </div>
                             <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900">GamePigeon</span>
                                <span className="text-[10px] text-gray-500">8-Ball & more</span>
                             </div>
                          </button>

                          {/* Other Apps */}
                          <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-100/80 rounded-2xl transition-colors text-left opacity-40 hover:opacity-100">
                             <div className="w-12 h-12 bg-pink-500 rounded-[12px] flex items-center justify-center shadow-sm shrink-0">
                                <ImageIcon className="text-white" size={20} />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900">Photos</span>
                                <span className="text-[10px] text-gray-500">Recent</span>
                             </div>
                          </button>

                          <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-100/80 rounded-2xl transition-colors text-left opacity-40 hover:opacity-100">
                             <div className="w-12 h-12 bg-blue-500 rounded-[12px] flex items-center justify-center shadow-sm shrink-0">
                                <DollarSign className="text-white" size={20} />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900">Apple Cash</span>
                                <span className="text-[10px] text-gray-500">Balance: $12</span>
                             </div>
                          </button>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 {/* Input Bar */}
                 <div className="flex items-center gap-3 relative z-40">
                    <div className="relative">
                        <motion.button 
                          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                          animate={{ rotate: isDrawerOpen ? 45 : 0 }}
                          className="text-gray-400 hover:text-gray-600 transition-colors relative z-10"
                        >
                           <Plus size={32} className="bg-gray-200 rounded-full p-1.5 text-gray-500" />
                        </motion.button>
                        
                        {/* Spotlight for Plus Button */}
                        {!isDrawerOpen && chatMessages.length === INITIAL_CHAT_MESSAGES.length && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.2 }}
                                transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                                className="absolute inset-0 bg-blue-500/30 rounded-full z-0 pointer-events-none blur-md"
                            />
                        )}
                        {!isDrawerOpen && chatMessages.length === INITIAL_CHAT_MESSAGES.length && (
                             <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 50 }}
                                className="absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg pointer-events-none"
                             >
                                Tap here!
                                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-blue-600 rotate-45" />
                             </motion.div>
                        )}
                    </div>
                    
                    <div className="flex-1 relative">
                       <input 
                         type="text" 
                         placeholder="iMessage"
                         disabled
                         className="w-full bg-white border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none"
                       />
                       <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2 text-gray-400">
                          {/* <Mic size={18} /> */}
                       </div>
                    </div>
                    
                    {/* <div className="text-blue-500 font-bold">
                       <Send size={24} />
                    </div> */}
                 </div>
              </div>
           </motion.div>
        )}

        {/* STEP 0.25: SELECTING MESSAGES */}
        {step === "selecting" && (
           <motion.div 
             key="selecting"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="flex flex-col h-full bg-white font-sans relative"
           >
              {/* Header */}
              <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between shadow-sm z-30 pt-8">
                 <div className="font-bold text-sm text-gray-800">Select Messages</div>
                 <Button 
                   size="sm" 
                   disabled={selectedMessages.length === 0}
                   onClick={() => setStep("scanning")}
                   className="h-8 text-xs rounded-full bg-sq-primary hover:bg-orange-600"
                 >
                   Analyze {selectedMessages.length > 0 && `(${selectedMessages.length})`}
                 </Button>
              </div>

              {/* Message Selection List */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
                 <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-xl mb-4 text-center">
                    Tap messages to extract trip details
                 </div>
                 {INITIAL_CHAT_MESSAGES.map((msg, i) => {
                    const isSelected = selectedMessages.includes(i);
                    return (
                    <motion.div 
                      key={i}
                      layout
                      onClick={() => {
                        if (isSelected) setSelectedMessages(prev => prev.filter(idx => idx !== i));
                        else setSelectedMessages(prev => [...prev, i]);
                      }}
                      className={`flex gap-3 cursor-pointer group ${isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                    >
                       {/* Selection Checkbox */}
                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-2 transition-colors ${isSelected ? 'bg-sq-primary border-sq-primary' : 'border-gray-300 bg-white'}`}>
                          {isSelected && <Check size={12} className="text-white" />}
                       </div>

                       <div className="flex-1">
                           <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold text-gray-500">{msg.user}</span>
                           </div>
                           <div className={`p-3 rounded-2xl text-sm transition-all border ${isSelected ? 'bg-orange-50 border-orange-200 shadow-sm' : 'bg-gray-50 border-transparent'}`}>
                              {msg.text}
                           </div>
                       </div>
                    </motion.div>
                 )})}
              </div>
           </motion.div>
        )}

        {/* STEP 0.5: SCANNING MESSAGES */}
        {step === "scanning" && (
           <motion.div 
             key="scanning"
             className="flex flex-col h-full bg-gray-50 relative overflow-hidden"
           >
              {/* Scan Overlay */}
              <div className="absolute inset-0 bg-orange-500/10 z-20 pointer-events-none">
                 <motion.div 
                    initial={{ top: 0 }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                 />
              </div>

              {/* Header */}
              <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between shadow-sm z-30 pt-8">
                 <div className="font-bold text-sm text-gray-800">Scanning Selection...</div>
                 <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
              </div>

              {/* Chat Messages being Scanned */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto transition-all duration-500">
                 {INITIAL_CHAT_MESSAGES.filter((_, i) => selectedMessages.includes(i)).map((msg, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-2"
                    >
                       <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                          {msg.user[0]}
                       </div>
                       <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-white border border-orange-100 shadow-sm relative">
                          <motion.div 
                             initial={{ scale: 0 }} 
                             animate={{ scale: 1 }}
                             transition={{ delay: idx * 0.2 + 0.5 }}
                             className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-1 shadow-sm"
                           >
                              <Check size={10} />
                           </motion.div>
                          <div className="text-[10px] font-bold opacity-50 mb-1">{msg.user}</div>
                          {msg.text}
                       </div>
                    </motion.div>
                 ))}
              </div>

              {/* Analysis Status */}
              <motion.div 
                 initial={{ y: 100 }}
                 animate={{ y: 0 }}
                 className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-30"
              >
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                       <Loader2 size={20} className="animate-spin" />
                    </div>
                    <div>
                       <div className="font-bold text-gray-800">Processing {selectedMessages.length} Messages</div>
                       <div className="text-xs text-gray-400">Extracting logistics & preferences...</div>
                    </div>
                 </div>
              </motion.div>
           </motion.div>
        )}

        {/* STEP 1: SETUP TRIP */}
        {step === "setup" && (
          <motion.div 
            key="setup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 flex flex-col h-full flex-1"
          >
            <div className="flex-1 pt-8">
               <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                  <MapPin size={28} />
               </div>
               <h2 className="text-2xl font-display font-bold text-sq-text mb-2">Start a Trip</h2>
               <p className="text-gray-500 mb-6 text-sm">Create a new group trip to get started.</p>

               <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wide">Trip Name</label>
                    <Input 
                      placeholder="e.g. Summer 2026 ☀️" 
                      className="text-lg py-5 rounded-xl border-gray-200 focus:ring-orange-500"
                      value={tripDetails.name}
                      onChange={(e) => setTripDetails({...tripDetails, name: e.target.value})}
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between mb-4">
                       <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Budget / Person</label>
                       <span className="text-sm font-bold text-orange-600 flex items-center gap-1">
                         {getBudgetEmoji(tripDetails.budget[0])} ${tripDetails.budget}
                       </span>
                    </div>
                    <Slider 
                       value={tripDetails.budget} 
                       onValueChange={(val) => setTripDetails({...tripDetails, budget: val})}
                       max={5000} 
                       step={100}
                       className="py-2"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wide">
                       <span>Cheap</span>
                       <span>Boujee</span>
                    </div>
                  </div>
               </div>
            </div>

            <Button 
              size="lg" 
              className="w-full rounded-xl font-bold text-lg bg-sq-primary hover:bg-orange-600 h-12 shadow-lg shadow-orange-500/20"
              onClick={handleStart}
              disabled={!tripDetails.name}
            >
              Create Trip <ChevronRight className="ml-2" size={18} />
            </Button>
          </motion.div>
        )}


        {/* STEP 2: SWIPING */}
        {step === "swipe" && (
           <motion.div 
             key="swipe"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.05 }}
             className="relative h-full flex flex-col flex-1"
           >
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-20">
                 <div 
                   className="h-full bg-orange-500 transition-all duration-300" 
                   style={{ width: `${((currentIndex) / DESTINATIONS.length) * 100}%` }} 
                 />
              </div>

              <div className="p-5 pb-0 flex justify-between items-center bg-white z-10 pt-6">
                 <div className="font-display font-bold text-lg text-sq-text truncate max-w-[150px]">{tripDetails.name}</div>
                 <div className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-500">
                    {currentIndex + 1} / {DESTINATIONS.length}
                 </div>
              </div>

              <div className="flex-1 p-4 flex items-center justify-center relative overflow-hidden">
                 <AnimatePresence mode="popLayout">
                    <motion.div
                       key={DESTINATIONS[currentIndex].id}
                       initial={{ scale: 0.95, opacity: 0, y: 20 }}
                       animate={{ 
                         scale: 1, 
                         opacity: 1, 
                         y: 0,
                         x: dragDirection === "left" ? -200 : dragDirection === "right" ? 200 : 0,
                         rotate: dragDirection === "left" ? -10 : dragDirection === "right" ? 10 : 0
                       }}
                       exit={{ scale: 1.05, opacity: 0 }}
                       transition={{ type: "spring", damping: 20, stiffness: 300 }}
                       className="w-full h-full relative rounded-3xl overflow-hidden shadow-xl bg-white cursor-grab active:cursor-grabbing group"
                       drag="x"
                       dragConstraints={{ left: 0, right: 0 }}
                       onDragEnd={(e, { offset, velocity }) => {
                         const swipe = offset.x;
                         if (swipe < -100) handleSwipe("left");
                         else if (swipe > 100) handleSwipe("right");
                       }}
                    >
                       <img 
                          src={DESTINATIONS[currentIndex].image} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          alt={DESTINATIONS[currentIndex].name}
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                       
                       {/* Swipe Indicators */}
                       <div className={`absolute top-6 right-6 border-4 border-green-500 text-green-500 text-xl font-black uppercase tracking-widest px-3 py-1 rounded-lg transform rotate-12 opacity-0 ${dragDirection === 'right' ? '!opacity-100' : ''} transition-opacity`}>
                         LIKE
                       </div>
                       <div className={`absolute top-6 left-6 border-4 border-red-500 text-red-500 text-xl font-black uppercase tracking-widest px-3 py-1 rounded-lg transform -rotate-12 opacity-0 ${dragDirection === 'left' ? '!opacity-100' : ''} transition-opacity`}>
                         NOPE
                       </div>

                       <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                          <h3 className="text-2xl font-display font-bold mb-1 leading-none">{DESTINATIONS[currentIndex].name}</h3>
                          <div className="flex items-center gap-2 mb-3">
                             <span className="bg-white/20 backdrop-blur px-2 py-0.5 rounded-full text-xs font-bold border border-white/20">
                               {DESTINATIONS[currentIndex].price}
                             </span>
                             <span className="text-white/80 text-xs">per person</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                             {DESTINATIONS[currentIndex].tags.map(tag => (
                                <span key={tag} className="bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold border border-white/10">
                                   {tag}
                                </span>
                             ))}
                          </div>
                       </div>
                    </motion.div>
                 </AnimatePresence>
              </div>

              <div className="p-4 pt-0 flex gap-4 justify-center items-center pb-6">
                 <button 
                    onClick={() => handleSwipe("left")}
                    className="w-14 h-14 rounded-full bg-white shadow-xl text-red-500 flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all border border-gray-100"
                 >
                    <X size={24} />
                 </button>
                 <button 
                    onClick={() => handleSwipe("right")}
                    className="w-14 h-14 rounded-full bg-sq-primary shadow-xl shadow-orange-500/30 text-white flex items-center justify-center hover:bg-orange-600 hover:scale-110 transition-all"
                 >
                    <Heart size={24} fill="currentColor" />
                 </button>
              </div>
           </motion.div>
        )}


        {/* STEP 3: SIMULATED GROUP VOTING */}
        {step === "voting" && (
           <motion.div 
              key="voting"
              className="flex flex-col items-center justify-center h-full p-6 text-center flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
           >
              <div className="w-full max-w-xs mb-8 space-y-3 relative h-40">
                <AnimatePresence>
                  {visibleMessages.map((msg, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex items-end gap-2 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                       <img src={msg.avatar} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                       <div className={`px-3 py-2 rounded-2xl text-xs font-medium shadow-sm ${msg.color} ${i % 2 === 0 ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                          {msg.text}
                       </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-6 relative">
                 <Loader2 size={28} className="text-orange-500 animate-spin" />
              </div>
              
              <h2 className="text-xl font-bold text-sq-text mb-1">Syncing Votes...</h2>
              <p className="text-gray-400 text-xs mb-6">Waiting for friends to decide</p>

              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden max-w-[200px] relative">
                 <motion.div 
                    className="bg-sq-primary h-full rounded-full absolute left-0 top-0"
                    animate={{ width: `${votingProgress}%` }}
                    transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                 />
              </div>
           </motion.div>
        )}


        {/* STEP 4: RESULTS */}
        {step === "result" && (
           <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 flex flex-col h-full bg-sq-primary text-white text-center flex-1 relative overflow-hidden"
           >
              {/* Confetti Canvas is handled by library, this is just background */}
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />

              <div className="flex-1 flex flex-col items-center justify-center relative z-10 pt-10">
                 <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-6 ring-4 ring-white/10">
                    <Check size={32} className="text-white" />
                 </div>
                 <h2 className="text-3xl font-display font-bold mb-1">It's a Match!</h2>
                 <p className="text-orange-100 text-sm mb-8">Your group decided on:</p>

                 <motion.div 
                   initial={{ y: 50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.2 }}
                   className="bg-white text-sq-text p-3 rounded-3xl w-full max-w-[260px] shadow-2xl mx-auto transform rotate-2 ring-4 ring-white/20"
                 >
                    <div className="aspect-video rounded-xl overflow-hidden mb-3 relative">
                       <img 
                          src={DESTINATIONS.find(d => d.id === likedDestinations[0])?.image || DESTINATIONS[0].image} 
                          className="w-full h-full object-cover" 
                       />
                       <div className="absolute top-2 right-2 bg-green-500 text-white text-[8px] font-bold px-2 py-1 rounded-full shadow-lg">
                          100% Match
                       </div>
                    </div>
                    <h3 className="font-bold text-lg mb-1 text-left leading-tight">
                       {DESTINATIONS.find(d => d.id === likedDestinations[0])?.name || DESTINATIONS[0].name}
                    </h3>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                       <span className="font-medium truncate max-w-[100px]">{tripDetails.name}</span>
                       <span className="flex -space-x-1.5">
                          {[1,2,3,4].map(i => (
                             <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" />
                          ))}
                       </span>
                    </div>
                 </motion.div>
              </div>

              <div className="mt-8 relative z-10 space-y-3 pb-4">
                 <p className="text-xs text-orange-100 font-medium">Trip is locked! What's next?</p>
                 
                 <Button 
                    size="lg" 
                    className="w-full bg-white text-sq-primary hover:bg-gray-50 font-bold rounded-xl h-12 shadow-lg text-sm"
                    onClick={() => setStep("split")}
                 >
                    <DollarSign className="mr-2" size={16} /> Split Expenses
                 </Button>

                 <Button 
                    variant="ghost"
                    className="w-full text-orange-100 hover:text-white hover:bg-white/10 h-8 text-xs"
                    onClick={() => {
                       const waitlist = document.getElementById("waitlist");
                       waitlist?.scrollIntoView({ behavior: "smooth" });
                    }}
                 >
                    Skip to Waitlist
                 </Button>
              </div>
           </motion.div>
        )}


        {/* STEP 5: EXPENSE SPLITTING */}
        {step === "split" && (
           <motion.div 
              key="split"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-5 flex flex-col h-full bg-gray-50"
           >
              <div className="flex items-center gap-2 mb-4 text-sq-text pt-2">
                 <Button variant="ghost" size="icon" onClick={() => setStep("result")} className="-ml-2 h-8 w-8">
                    <ChevronRight className="rotate-180" size={20} />
                 </Button>
                 <h2 className="text-lg font-bold font-display">Shared Expenses</h2>
              </div>

              {/* Total Card */}
              <div className="bg-sq-text text-white p-5 rounded-3xl shadow-xl mb-4 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
                 <div className="relative z-10">
                    <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Trip Cost</div>
                    <div className="text-3xl font-bold font-display flex items-baseline gap-1">
                       ${currentExpenses.reduce((acc: number, curr: Expense) => acc + curr.amount, 0).toLocaleString()}
                    </div>
                    <div className="mt-3 flex gap-2">
                       <div className="flex -space-x-1.5">
                          {[1,2,3,4].map(i => (
                             <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-6 h-6 rounded-full border-2 border-sq-text" />
                          ))}
                       </div>
                       <div className="text-[10px] text-gray-400 flex items-center">
                          Split by 4 people
                       </div>
                    </div>
                 </div>
              </div>

              {/* Expenses List */}
              <div className="flex-1 overflow-y-auto pr-1 -mr-1 space-y-2 mb-4">
                 <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Recent Payments</h3>
                 {currentExpenses.map((expense: Expense, i: number) => (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.1 }}
                       className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
                    >
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-lg">
                             {expense.icon}
                          </div>
                          <div>
                             <div className="font-bold text-gray-800 text-sm">{expense.title}</div>
                             <div className="text-[10px] text-gray-400">Paid by <span className="font-bold text-gray-600">{expense.payer}</span></div>
                          </div>
                       </div>
                       <div className="font-bold text-sq-text text-sm">
                          ${expense.amount}
                       </div>
                    </motion.div>
                 ))}
              </div>

              {/* Settle Up Action */}
              <div className="bg-white p-4 rounded-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
                 <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                       <ArrowRightLeft className="text-orange-500" size={16} />
                       <span className="font-bold text-gray-700 text-sm">You owe Sarah</span>
                    </div>
                    <span className="font-bold text-lg text-sq-text">$350.00</span>
                 </div>
                 <Button 
                    size="lg" 
                    className="w-full bg-black text-white hover:bg-gray-800 font-bold rounded-xl h-12 text-sm"
                    onClick={() => {
                       confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
                       setTimeout(() => {
                         const waitlist = document.getElementById("waitlist");
                         waitlist?.scrollIntoView({ behavior: "smooth" });
                       }, 1500);
                    }}
                 >
                    <CreditCard className="mr-2" size={16} /> Pay & Settle Up
                 </Button>
              </div>

           </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
