#!/bin/bash

echo "🔐 Sanity API Token Setup Helper"
echo "================================"
echo ""

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists!"
    echo "   Current contents:"
    cat .env
    echo ""
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled."
        exit 1
    fi
fi

echo "📋 Please follow these steps:"
echo ""
echo "1. 🌐 Open your browser and go to:"
echo "   https://www.sanity.io/manage/project/0knotzp4/api"
echo ""
echo "2. 🔑 Create a new API token:"
echo "   • Click 'Add API token'"
echo "   • Name: 'Inline Editing Token'"
echo "   • Permissions: Editor (read + write)"
echo "   • Copy the generated token"
echo ""
echo "3. 📝 Paste your token below:"
echo ""

# Get token from user
read -p "Enter your Sanity API token: " SANITY_TOKEN

if [ -z "$SANITY_TOKEN" ]; then
    echo "❌ No token provided. Setup cancelled."
    exit 1
fi

# Create .env file
cat > .env << EOF
# Sanity API Integration
# Generated on $(date)

# Required: Sanity API Token for reading content
SANITY_API_READ_TOKEN=$SANITY_TOKEN

# Required: Sanity API Token for writing content (for inline editing)
SANITY_API_WRITE_TOKEN=$SANITY_TOKEN
EOF

echo ""
echo "✅ .env file created successfully!"
echo ""
echo "🔄 Next steps:"
echo "   1. Restart your development server: npm run dev"
echo "   2. Visit: http://localhost:4321/?preview=true"
echo "   3. Try editing content with orange outlines"
echo ""
echo "🎉 Inline editing should now work!"



