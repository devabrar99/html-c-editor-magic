import { useState } from "react";
import { Calendar, Clock, Target, Trophy, BookOpen, CheckCircle, Plus, Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newStudyData, setNewStudyData] = useState({
    subject: "",
    topic: "",
    lectures: 0,
    questions: 0,
    time: 0,
    notes: ""
  });

  // Mock data for countdown
  const examDate = new Date("2026-05-05");
  const now = new Date();
  const timeDiff = examDate.getTime() - now.getTime();
  const days = Math.floor(timeDiff / (1000 * 3600 * 24));
  const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  const studyData = [
    {
      id: 1,
      subject: "Physics",
      topic: "Chapter 09",
      lectures: 9,
      questions: 0,
      time: 7,
      isDone: true,
      notes: "Completed all practice problems"
    },
    {
      id: 2,
      subject: "Physics", 
      topic: "Chapter 09",
      lectures: 0,
      questions: 12,
      time: 7,
      isDone: true,
      notes: "Need to review wave properties"
    }
  ];

  const totalStats = {
    lectures: studyData.reduce((acc, item) => acc + item.lectures, 0),
    questions: studyData.reduce((acc, item) => acc + item.questions, 0),
    time: studyData.reduce((acc, item) => acc + item.time, 0),
    streak: 15
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NEET Prep
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="hidden sm:flex">
              <TrendingUp className="h-4 w-4 mr-1" />
              Streak: {totalStats.streak} days
            </Badge>
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Countdown Section */}
        <Card className="overflow-hidden bg-gradient-to-br from-primary to-accent border-0 text-primary-foreground">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Target className="h-8 w-8" />
              <h2 className="text-3xl font-bold">NEET 2026</h2>
            </div>
            <p className="text-lg opacity-90 mb-8">Your Medical Dream Countdown</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: days, label: "Days" },
                { value: hours, label: "Hours" },
                { value: minutes, label: "Minutes" },
                { value: seconds, label: "Seconds" }
              ].map((item, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl md:text-4xl font-bold">{item.value}</div>
                  <div className="text-sm opacity-80">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5" />
                <span className="font-medium">Daily Motivation</span>
              </div>
              <p className="italic">"It always seems impossible until it's done."</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Form Release: Feb 2026
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Last Date: Mar 2026
              </Badge>
              <Badge variant="secondary" className="bg-warning text-warning-foreground">
                Exam Date: May 5, 2026
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Study Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Daily Study Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Select Date:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, "dd-MM-yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-primary/20">
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{totalStats.lectures}</div>
                  <div className="text-sm text-muted-foreground">Lectures</div>
                </CardContent>
              </Card>
              <Card className="border-accent/20">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{totalStats.questions}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </CardContent>
              </Card>
              <Card className="border-warning/20">
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
                  <div className="text-2xl font-bold">{totalStats.time}</div>
                  <div className="text-sm text-muted-foreground">Time (hrs)</div>
                </CardContent>
              </Card>
              <Card className="border-success/20">
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold">{totalStats.streak}</div>
                  <div className="text-sm text-muted-foreground">Streak</div>
                </CardContent>
              </Card>
            </div>

            {/* Add New Study Entry */}
            <Card className="border-dashed border-2 border-muted">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Study Session
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Topic" />
                  <Input type="number" placeholder="Lectures" />
                  <Input type="number" placeholder="Questions" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input type="number" placeholder="Time (hrs)" />
                  <Textarea placeholder="Notes" className="resize-none" />
                </div>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Study Session
                </Button>
              </CardContent>
            </Card>

            {/* Study Sessions List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Today's Sessions</h3>
              {studyData.map((session) => (
                <Card key={session.id} className="transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${session.isDone ? 'bg-success' : 'bg-muted'}`} />
                        <span className="font-semibold text-lg">{session.subject} - {session.topic}</span>
                        {session.isDone && (
                          <Badge variant="outline" className="text-success border-success">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Done
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{session.lectures}</div>
                        <div className="text-xs text-muted-foreground">Lectures</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-accent">{session.questions}</div>
                        <div className="text-xs text-muted-foreground">Questions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-warning">{session.time} hrs</div>
                        <div className="text-xs text-muted-foreground">Time</div>
                      </div>
                    </div>

                    {session.notes && (
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        <span className="font-medium">Notes: </span>
                        {session.notes}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;