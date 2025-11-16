'use client';

import { useState } from 'react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface ConversationState {
  stage: 'style' | 'plants' | 'usage' | 'feelings' | 'summary';
  responses: {
    style?: string;
    plants?: string;
    usage?: string;
    feelings?: string;
  };
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome! I'm here to help you design your dream garden. Let's start by exploring what garden style resonates with you.\n\nWhich of these styles appeals to you most, or describe your own vision:\n\n🌿 **Formal/Traditional** - Structured layouts, hedges, symmetry, classic elegance\n🏡 **Cottage Garden** - Romantic, abundant, mixed flowers and herbs, relaxed charm\n🍃 **Modern/Minimalist** - Clean lines, simple palette, architectural plants, zen-like\n🌾 **Natural/Wild** - Native plants, meadows, wildlife-friendly, organic feel\n🏝️ **Tropical/Mediterranean** - Bold foliage, exotic plants, warm climate vibes\n🌸 **Japanese/Zen** - Water features, stone, contemplative, balanced harmony\n\nTell me which appeals to you or describe your dream garden style!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>({
    stage: 'style',
    responses: {}
  });

  const getNextQuestion = (state: ConversationState): string => {
    switch (state.stage) {
      case 'plants':
        return "Great! Now let's talk about plants. What types of plants draw your eye?\n\n🌹 **Flowering plants** - Roses, peonies, lavender, vibrant blooms\n🌳 **Trees & Shrubs** - Structure, shade, seasonal interest\n🥬 **Edibles** - Vegetables, herbs, fruit trees, productive gardens\n🌿 **Foliage plants** - Hostas, ferns, grasses, texture and color\n🌵 **Succulents/Drought-tolerant** - Low maintenance, architectural shapes\n🌺 **Perennials** - Year-after-year beauty, evolving displays\n🪴 **Container plants** - Flexible, moveable, patio-friendly\n\nShare your favorites or tell me what catches your attention in gardens!";

      case 'usage':
        return "Perfect! Now, how do you envision using your garden?\n\n☕ **Relaxation & Reading** - Quiet corners, comfortable seating\n🎉 **Entertaining** - Dining areas, social spaces, gathering spots\n🏃 **Active Play** - Lawn space, activities, family fun\n🧘 **Meditation & Wellness** - Peaceful retreat, contemplation, mindfulness\n👨‍🌾 **Gardening & Growing** - Raised beds, workspace, hands-on cultivation\n🐦 **Wildlife Watching** - Bird feeders, natural habitats, observation\n🎨 **Beauty & Display** - Visual showcase, seasonal displays, curb appeal\n\nHow do you see yourself spending time in your garden?";

      case 'feelings':
        return "Excellent! Finally, what feelings or atmosphere do you want your garden to evoke?\n\n😌 **Peaceful & Calm** - Sanctuary from stress, tranquil escape\n✨ **Joyful & Vibrant** - Energizing, colorful, uplifting\n🌙 **Mysterious & Enchanting** - Hidden paths, discovery, romantic\n🏠 **Cozy & Intimate** - Enclosed spaces, personal, homely\n🌅 **Open & Expansive** - Spacious, flowing, connected to landscape\n🎭 **Dramatic & Bold** - Statement pieces, striking contrasts, wow factor\n🍂 **Natural & Organic** - Effortless, unpretentious, earthy\n\nWhat emotional experience do you want your garden to create?";

      case 'summary':
        return generateSummary(state);

      default:
        return "Let's start with your garden style preferences!";
    }
  };

  const generateSummary = (state: ConversationState): string => {
    const { style, plants, usage, feelings } = state.responses;

    return `# Your Personalized Garden Profile 🌺

Based on our conversation, here's your ideal garden vision:

## Garden Style
${style}

## Plant Preferences
${plants}

## How You'll Use Your Space
${usage}

## Atmosphere & Feeling
${feelings}

---

## Personalized Recommendations

### Design Elements:
${getDesignRecommendations(state)}

### Recommended Plants:
${getPlantRecommendations(state)}

### Key Features to Include:
${getFeatureRecommendations(state)}

### Next Steps:
1. **Assess your space** - Measure dimensions, note sun/shade patterns, check soil type
2. **Set a budget** - Determine how much you want to invest initially
3. **Create zones** - Divide your garden into functional areas based on usage
4. **Start small** - Begin with high-impact areas and expand over time
5. **Consult a professional** - Consider working with a landscape designer to bring your vision to life

Thank you for sharing your garden dreams with me! Would you like to explore any specific aspect in more detail?`;
  };

  const getDesignRecommendations = (state: ConversationState): string => {
    const style = state.responses.style?.toLowerCase() || '';

    if (style.includes('formal') || style.includes('traditional')) {
      return '• Symmetrical layouts with central focal points\n• Clipped hedges and topiary\n• Stone or brick pathways\n• Classic ornamental features';
    } else if (style.includes('cottage')) {
      return '• Mixed borders overflowing with plants\n• Curved pathways with stepping stones\n• Picket fences or rustic borders\n• Vintage garden accessories';
    } else if (style.includes('modern') || style.includes('minimalist')) {
      return '• Clean geometric shapes and lines\n• Limited color palette (greens, whites, grays)\n• Contemporary materials (steel, concrete, glass)\n• Strategic negative space';
    } else if (style.includes('natural') || style.includes('wild')) {
      return '• Organic, flowing shapes\n• Native plant groupings\n• Natural mulches and materials\n• Wildlife corridors and habitats';
    } else if (style.includes('tropical') || style.includes('mediterranean')) {
      return '• Bold architectural plants\n• Warm-toned hardscaping\n• Gravel or terracotta elements\n• Protected microclimates';
    } else if (style.includes('japanese') || style.includes('zen')) {
      return '• Asymmetrical balance\n• Water features (ponds, basins)\n• Stone arrangements and gravel\n• Restrained plant palette';
    }
    return '• Blend of formal and informal elements\n• Varied textures and heights\n• Comfortable seating areas\n• Personal touches reflecting your style';
  };

  const getPlantRecommendations = (state: ConversationState): string => {
    const plants = state.responses.plants?.toLowerCase() || '';
    const style = state.responses.style?.toLowerCase() || '';

    let recommendations = [];

    if (plants.includes('flowering')) {
      recommendations.push('• Roses (hybrid tea, floribunda, or climbing varieties)');
      recommendations.push('• Peonies for spectacular spring blooms');
      recommendations.push('• Lavender for color, fragrance, and pollinators');
      recommendations.push('• Daylilies for easy-care summer color');
    }

    if (plants.includes('tree') || plants.includes('shrub')) {
      recommendations.push('• Flowering dogwood or cherry for spring interest');
      recommendations.push('• Japanese maple for structure and fall color');
      recommendations.push('• Hydrangeas for reliable summer blooms');
      recommendations.push('• Evergreens for year-round structure');
    }

    if (plants.includes('edible')) {
      recommendations.push('• Herbs: rosemary, thyme, basil, mint');
      recommendations.push('• Tomatoes and peppers in sunny spots');
      recommendations.push('• Berry bushes (blueberries, raspberries)');
      recommendations.push('• Dwarf fruit trees in containers');
    }

    if (plants.includes('foliage')) {
      recommendations.push('• Hostas for shade areas');
      recommendations.push('• Ornamental grasses for movement');
      recommendations.push('• Ferns for woodland atmosphere');
      recommendations.push('• Heuchera for colorful groundcover');
    }

    if (plants.includes('succulent') || plants.includes('drought')) {
      recommendations.push('• Sedum varieties for texture');
      recommendations.push('• Agave for bold statements');
      recommendations.push('• Ornamental grasses (drought-tolerant)');
      recommendations.push('• Lavender and sage family plants');
    }

    if (recommendations.length === 0) {
      recommendations.push('• Mix of evergreens and deciduous plants');
      recommendations.push('• Layered heights (trees, shrubs, perennials, groundcovers)');
      recommendations.push('• Three-season interest plants');
      recommendations.push('• Native species suited to your climate');
    }

    return recommendations.join('\n');
  };

  const getFeatureRecommendations = (state: ConversationState): string => {
    const usage = state.responses.usage?.toLowerCase() || '';
    const feelings = state.responses.feelings?.toLowerCase() || '';

    let features = [];

    if (usage.includes('relaxation') || usage.includes('reading')) {
      features.push('• Comfortable bench or lounge seating');
      features.push('• Shade structure (pergola or tree canopy)');
      features.push('• Privacy screening');
    }

    if (usage.includes('entertaining')) {
      features.push('• Patio or deck area');
      features.push('• Outdoor dining table');
      features.push('• Ambient lighting for evenings');
      features.push('• Built-in seating or fire pit');
    }

    if (usage.includes('active') || usage.includes('play')) {
      features.push('• Open lawn area');
      features.push('• Durable, low-maintenance ground covers');
      features.push('• Safe pathways');
    }

    if (usage.includes('meditation') || usage.includes('wellness')) {
      features.push('• Water feature for soothing sounds');
      features.push('• Secluded seating nook');
      features.push('• Wind chimes or garden art');
      features.push('• Fragrant plants along pathways');
    }

    if (usage.includes('gardening') || usage.includes('growing')) {
      features.push('• Raised beds or vegetable garden');
      features.push('• Tool storage shed');
      features.push('• Composting area');
      features.push('• Potting bench');
    }

    if (usage.includes('wildlife')) {
      features.push('• Bird feeders and baths');
      features.push('• Native pollinator plants');
      features.push('• Brush pile or log feature');
      features.push('• Varied plant heights for habitat');
    }

    if (feelings.includes('peaceful') || feelings.includes('calm')) {
      features.push('• Soft color palette');
      features.push('• Gentle water sounds');
      features.push('• Enclosed or semi-enclosed spaces');
    }

    if (feelings.includes('joyful') || feelings.includes('vibrant')) {
      features.push('• Bold color combinations');
      features.push('• Seasonal displays');
      features.push('• Garden art or sculptures');
    }

    if (feelings.includes('mysterious') || feelings.includes('enchanting')) {
      features.push('• Winding pathways');
      features.push('• Hidden garden rooms');
      features.push('• Archways or gates');
      features.push('• Evening lighting');
    }

    if (features.length === 0) {
      features.push('• Quality pathways for easy access');
      features.push('• Seating areas to enjoy views');
      features.push('• Lighting for safety and ambiance');
      features.push('• Irrigation system for maintenance ease');
    }

    return features.join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);

    // Update conversation state with user response
    const updatedState = { ...conversationState };
    if (conversationState.stage !== 'summary') {
      updatedState.responses[conversationState.stage] = userMessage;
    }

    // Move to next stage
    let nextStage: ConversationState['stage'] = 'summary';
    if (conversationState.stage === 'style') nextStage = 'plants';
    else if (conversationState.stage === 'plants') nextStage = 'usage';
    else if (conversationState.stage === 'usage') nextStage = 'feelings';
    else if (conversationState.stage === 'feelings') nextStage = 'summary';

    updatedState.stage = nextStage;
    setConversationState(updatedState);

    // Generate next question
    setTimeout(() => {
      const nextQuestion = getNextQuestion(updatedState);
      setMessages([...newMessages, { role: 'assistant', content: nextQuestion }]);
      setIsLoading(false);
    }, 800);
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Welcome! I'm here to help you design your dream garden. Let's start by exploring what garden style resonates with you.\n\nWhich of these styles appeals to you most, or describe your own vision:\n\n🌿 **Formal/Traditional** - Structured layouts, hedges, symmetry, classic elegance\n🏡 **Cottage Garden** - Romantic, abundant, mixed flowers and herbs, relaxed charm\n🍃 **Modern/Minimalist** - Clean lines, simple palette, architectural plants, zen-like\n🌾 **Natural/Wild** - Native plants, meadows, wildlife-friendly, organic feel\n🏝️ **Tropical/Mediterranean** - Bold foliage, exotic plants, warm climate vibes\n🌸 **Japanese/Zen** - Water features, stone, contemplative, balanced harmony\n\nTell me which appeals to you or describe your dream garden style!"
      }
    ]);
    setConversationState({
      stage: 'style',
      responses: {}
    });
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-300 mb-3">
            🌿 Garden Design Questionnaire
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Discover your perfect garden through AI-guided conversation
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-[600px] overflow-y-auto p-6 space-y-4" style={{ scrollBehavior: 'smooth' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                    message.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words prose prose-sm max-w-none dark:prose-invert">
                    {message.content.split('\n').map((line, i) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={i} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
                      } else if (line.startsWith('## ')) {
                        return <h2 key={i} className="text-xl font-semibold mt-3 mb-2">{line.substring(3)}</h2>;
                      } else if (line.startsWith('### ')) {
                        return <h3 key={i} className="text-lg font-semibold mt-2 mb-1">{line.substring(4)}</h3>;
                      } else if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                        return <div key={i} className="ml-4 mb-1">{line}</div>;
                      } else if (line.includes('**')) {
                        const parts = line.split('**');
                        return (
                          <p key={i} className="mb-2">
                            {parts.map((part, j) =>
                              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                            )}
                          </p>
                        );
                      } else if (line.trim() === '---') {
                        return <hr key={i} className="my-4 border-gray-300 dark:border-gray-600" />;
                      } else if (line.trim()) {
                        return <p key={i} className="mb-2">{line}</p>;
                      } else {
                        return <br key={i} />;
                      }
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-5 py-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response..."
                disabled={isLoading || conversationState.stage === 'summary'}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {conversationState.stage === 'summary' ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                >
                  Start Over
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              )}
            </form>

            <div className="mt-3 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className={`px-3 py-1 rounded-full ${conversationState.stage === 'style' ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  Style
                </span>
                <span>→</span>
                <span className={`px-3 py-1 rounded-full ${conversationState.stage === 'plants' ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  Plants
                </span>
                <span>→</span>
                <span className={`px-3 py-1 rounded-full ${conversationState.stage === 'usage' ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  Usage
                </span>
                <span>→</span>
                <span className={`px-3 py-1 rounded-full ${conversationState.stage === 'feelings' ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  Feelings
                </span>
                <span>→</span>
                <span className={`px-3 py-1 rounded-full ${conversationState.stage === 'summary' ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  Summary
                </span>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm">
          <p>Powered by AI • Your garden dreams start here</p>
        </footer>
      </div>
    </div>
  );
}
