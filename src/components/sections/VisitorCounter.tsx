"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Clock, CalendarDays, Calendar, Globe2, MapPin } from "lucide-react";

interface VisitorStats {
  today: number;
  week: number;
  month: number;
  total: number;
  location: string;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats>({
    today: 0,
    week: 0,
    month: 0,
    total: 0,
    location: "Detecting...",
  });

  useEffect(() => {
    // Increment visitor count using localStorage for offline demo
    const now = new Date();
    const todayKey = `visitors_${now.toISOString().slice(0, 10)}`;
    const weekKey = `visitors_week_${getWeekNumber(now)}`;
    const monthKey = `visitors_month_${now.getFullYear()}_${now.getMonth()}`;
    const totalKey = "visitors_total";

    // Initialize and increment
    const todayCount = parseInt(localStorage.getItem(todayKey) || "0") + 1;
    const weekCount = parseInt(localStorage.getItem(weekKey) || "0") + 1;
    const monthCount = parseInt(localStorage.getItem(monthKey) || "0") + 1;
    const totalCount = parseInt(localStorage.getItem(totalKey) || "0") + 1;

    localStorage.setItem(todayKey, todayCount.toString());
    localStorage.setItem(weekKey, weekCount.toString());
    localStorage.setItem(monthKey, monthCount.toString());
    localStorage.setItem(totalKey, totalCount.toString());

    setStats({
      today: todayCount,
      week: weekCount,
      month: monthCount,
      total: totalCount,
      location: "Detecting...",
    });

    // Fetch visitor location from a free geoip API
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.city && data.country_name) {
          setStats((prev) => ({
            ...prev,
            location: `${data.city}, ${data.country_name}`,
          }));
        }
      })
      .catch(() => {
        setStats((prev) => ({ ...prev, location: "Unknown" }));
      });
  }, []);

  return (
    <div className="bg-[#050810] border-t border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Eye size={14} className="text-salesforce" />
              <span>Today: <span className="text-gray-300 font-semibold">{stats.today}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-purple-400" />
              <span>This Week: <span className="text-gray-300 font-semibold">{stats.week}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDays size={14} className="text-gold" />
              <span>This Month: <span className="text-gray-300 font-semibold">{stats.month}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-green-400" />
              <span>Total: <span className="text-gray-300 font-semibold">{stats.total}</span></span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin size={14} className="text-red-400" />
            <span>Your Location: <span className="text-gray-300 font-medium">{stats.location}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getWeekNumber(d: Date): string {
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const diff = d.getTime() - startOfYear.getTime();
  const oneWeek = 604800000;
  return `${d.getFullYear()}_W${Math.ceil(diff / oneWeek)}`;
}
