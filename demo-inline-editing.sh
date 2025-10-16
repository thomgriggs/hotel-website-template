#!/bin/bash

echo "🎯 Hotel Website - Inline Editing Demo"
echo "======================================"
echo ""

echo "🚀 Starting Development Servers..."
echo ""

# Start Astro frontend
echo "Starting Astro frontend (port 4321)..."
cd /Users/thomasgriggs/Development/hotel-website-template
npm run dev &
ASTRO_PID=$!

# Start Sanity Studio
echo "Starting Sanity Studio (port 3333)..."
cd /Users/thomasgriggs/Development/hotel-website-template/hotel-website
npm run dev &
SANITY_PID=$!

echo ""
echo "⏳ Waiting for servers to start..."
sleep 8

echo ""
echo "✅ Servers are running!"
echo ""
echo "🌐 Frontend: http://localhost:4321"
echo "🎨 Sanity Studio: http://localhost:3333"
echo ""
echo "🎯 PREVIEW MODE URLs:"
echo "   Homepage: http://localhost:4321/?preview=true"
echo "   Contact:  http://localhost:4321/contact?preview=true"
echo "   Location: http://localhost:4321/location?preview=true"
echo ""
echo "📋 How to Test Inline Editing:"
echo "1. Visit any preview URL above"
echo "2. Look for the 🔴 PREVIEW MODE banner"
echo "3. Hover over content to see edit indicators"
echo "4. Click ✏️ buttons to edit specific fields"
echo "5. Click 📝 buttons to edit entire sections"
echo "6. Changes open in Sanity Studio with field focused"
echo ""
echo "🎨 Content Templates:"
echo "1. Go to Sanity Studio → Content Templates"
echo "2. Create new content using templates"
echo "3. Templates pre-fill fields with best practices"
echo ""
echo "🔧 Enhanced Validation:"
echo "1. Create/edit content in Sanity Studio"
echo "2. See real-time validation feedback"
echo "3. Click ? icons for contextual help"
echo "4. Use suggested values for consistency"
echo ""
echo "Press Ctrl+C to stop servers"

# Wait for user interrupt
trap "echo ''; echo '🛑 Stopping servers...'; kill $ASTRO_PID $SANITY_PID; exit" INT
wait



