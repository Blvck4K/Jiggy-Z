import React from 'react';

interface EnhancedContentDisplayProps {
  content: any;
  contentType: 'movie' | 'tv' | 'game';
}

const EnhancedContentDisplay: React.FC<EnhancedContentDisplayProps> = ({ content, contentType }) => {
  const displayContent = content || {};
  const typeName = contentType === 'movie' ? 'Movie' : contentType === 'tv' ? 'Show' : 'Game';
  
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 mb-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
        <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
          About This {typeName}
        </span>
      </h2>
      
      <div className="prose prose-invert max-w-none">
        <div className="text-gray-300 leading-relaxed text-lg space-y-4">
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-yellow-400">
            {displayContent.description || `No detailed description available for this ${typeName.toLowerCase()}.`}
          </p>
          
          {displayContent.description && displayContent.description.length > 200 && (
            <>
              <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Key Highlights</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• {contentType === 'movie' ? 'Engaging storyline with compelling characters' : 
                       contentType === 'tv' ? 'Multi-episode narrative with character development' : 
                       'Immersive gameplay with strategic elements'}</li>
                  <li>• {contentType === 'game' ? 'Challenging mechanics and progression system' : 'High production values and quality'}</li>
                  <li>• {contentType === 'movie' ? 'Cinematic experience with stunning visuals' : 
                       contentType === 'tv' ? 'Season-long story arcs with satisfying conclusions' : 
                       'Replayability with different strategies and outcomes'}</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-sm text-gray-400 italic">
                  This comprehensive overview provides insights into the {typeName.toLowerCase()}'s key themes, 
                  characters, and overall experience to help you decide if it's right for you.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedContentDisplay;