import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Check, X, Loader2 } from 'lucide-react';

interface Booking {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    service: string;
    date: string;
    time: string;
    notes: string | null;
    status: string;
    created_at: string;
}

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: string;
    created_at: string;
}

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'bookings' | 'messages'>('bookings');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    // Simple password protection (in production, use proper auth)
    const ADMIN_PASSWORD = 'glamour2024';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setAuthError('');
            localStorage.setItem('adminAuth', 'true');
        } else {
            setAuthError('Invalid password');
        }
    };

    useEffect(() => {
        // Check if already authenticated
        if (localStorage.getItem('adminAuth') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'bookings') {
                const res = await fetch('/api/bookings');
                const data = await res.json();
                if (data.success) {
                    setBookings(data.data);
                }
            } else {
                const res = await fetch('/api/contact');
                const data = await res.json();
                if (data.success) {
                    setMessages(data.data);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateBookingStatus = async (id: number, status: string) => {
        try {
            await fetch(`/api/bookings/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            fetchData();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const updateMessageStatus = async (id: number, status: string) => {
        try {
            await fetch(`/api/contact/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            fetchData();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
            case 'unread':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
            case 'read':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
            case 'replied':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (!isAuthenticated) {
        return (
            <Layout>
                <section className="min-h-screen pt-32 pb-20 flex items-center">
                    <div className="container-custom">
                        <AnimatedSection className="max-w-md mx-auto">
                            <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
                                <h1 className="font-heading text-2xl font-semibold mb-6 text-center">Admin Login</h1>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div>
                                        <label className="text-foreground font-medium mb-2 block">Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="input-elegant"
                                            placeholder="Enter admin password"
                                        />
                                    </div>
                                    {authError && <p className="text-destructive text-sm">{authError}</p>}
                                    <button type="submit" className="btn-primary w-full">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="pt-32 pb-20 bg-cream min-h-screen">
                <div className="container-custom">
                    <AnimatedSection className="mb-8">
                        <div className="flex justify-between items-center flex-wrap gap-4">
                            <div>
                                <h1 className="heading-section">Admin Dashboard</h1>
                                <p className="text-muted-foreground">Manage bookings and contact messages</p>
                            </div>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('adminAuth');
                                    setIsAuthenticated(false);
                                }}
                                className="btn-outline text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </AnimatedSection>

                    {/* Tabs */}
                    <AnimatedSection className="flex gap-4 mb-8">
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'bookings'
                                    ? 'bg-rose text-white shadow-lg'
                                    : 'bg-card border border-border hover:border-rose'
                                }`}
                        >
                            <Calendar className="w-5 h-5 inline-block mr-2" />
                            Bookings ({bookings.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'messages'
                                    ? 'bg-rose text-white shadow-lg'
                                    : 'bg-card border border-border hover:border-rose'
                                }`}
                        >
                            <MessageSquare className="w-5 h-5 inline-block mr-2" />
                            Messages ({messages.length})
                        </button>
                    </AnimatedSection>

                    {/* Content */}
                    <AnimatedSection>
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-rose" />
                            </div>
                        ) : activeTab === 'bookings' ? (
                            <div className="space-y-4">
                                {bookings.length === 0 ? (
                                    <div className="bg-card rounded-2xl p-8 text-center border border-border">
                                        <p className="text-muted-foreground">No bookings yet</p>
                                    </div>
                                ) : (
                                    bookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="bg-card rounded-2xl p-6 border border-border shadow-sm"
                                        >
                                            <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                                                <div>
                                                    <h3 className="font-heading text-xl font-semibold flex items-center gap-2">
                                                        <User className="w-5 h-5 text-rose" />
                                                        {booking.name}
                                                    </h3>
                                                    <p className="text-muted-foreground text-sm">
                                                        Booked on {formatDate(booking.created_at)}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                                    {booking.status}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Phone className="w-4 h-4" />
                                                    <a href={`tel:${booking.phone}`} className="hover:text-rose">
                                                        {booking.phone}
                                                    </a>
                                                </div>
                                                {booking.email && (
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Mail className="w-4 h-4" />
                                                        <a href={`mailto:${booking.email}`} className="hover:text-rose">
                                                            {booking.email}
                                                        </a>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Calendar className="w-4 h-4" />
                                                    {booking.date}
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Clock className="w-4 h-4" />
                                                    {booking.time}
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <span className="font-medium">Service:</span>{' '}
                                                <span className="text-rose">{booking.service}</span>
                                            </div>

                                            {booking.notes && (
                                                <div className="mb-4 p-3 bg-cream rounded-lg">
                                                    <span className="font-medium">Notes:</span> {booking.notes}
                                                </div>
                                            )}

                                            <div className="flex gap-2 flex-wrap">
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                                                >
                                                    <Check className="w-4 h-4 inline-block mr-1" />
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'completed')}
                                                    className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                                                >
                                                    <Check className="w-4 h-4 inline-block mr-1" />
                                                    Complete
                                                </button>
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                                    className="px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                                                >
                                                    <X className="w-4 h-4 inline-block mr-1" />
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.length === 0 ? (
                                    <div className="bg-card rounded-2xl p-8 text-center border border-border">
                                        <p className="text-muted-foreground">No messages yet</p>
                                    </div>
                                ) : (
                                    messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className="bg-card rounded-2xl p-6 border border-border shadow-sm"
                                        >
                                            <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                                                <div>
                                                    <h3 className="font-heading text-xl font-semibold flex items-center gap-2">
                                                        <User className="w-5 h-5 text-rose" />
                                                        {msg.name}
                                                    </h3>
                                                    <p className="text-muted-foreground text-sm">
                                                        Received on {formatDate(msg.created_at)}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(msg.status)}`}>
                                                    {msg.status}
                                                </span>
                                            </div>

                                            <div className="flex gap-4 mb-4 flex-wrap">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Mail className="w-4 h-4" />
                                                    <a href={`mailto:${msg.email}`} className="hover:text-rose">
                                                        {msg.email}
                                                    </a>
                                                </div>
                                                {msg.phone && (
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Phone className="w-4 h-4" />
                                                        <a href={`tel:${msg.phone}`} className="hover:text-rose">
                                                            {msg.phone}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mb-4 p-4 bg-cream rounded-lg">
                                                <p className="text-foreground">{msg.message}</p>
                                            </div>

                                            <div className="flex gap-2 flex-wrap">
                                                <button
                                                    onClick={() => updateMessageStatus(msg.id, 'read')}
                                                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                                                >
                                                    Mark as Read
                                                </button>
                                                <button
                                                    onClick={() => updateMessageStatus(msg.id, 'replied')}
                                                    className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                                                >
                                                    Mark as Replied
                                                </button>
                                                <a
                                                    href={`mailto:${msg.email}?subject=Re: Your inquiry at Glamour Studio`}
                                                    className="px-4 py-2 bg-rose text-white rounded-lg text-sm font-medium hover:bg-rose/90 transition-colors"
                                                >
                                                    Reply via Email
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </AnimatedSection>
                </div>
            </section>
        </Layout>
    );
};

export default AdminDashboard;
