export default function AuthorBio() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">FF</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Fifti Fifti Editorial Team</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our team of home decor enthusiasts and interior design experts brings you the latest trends, 
            practical tips, and inspiring ideas to help you create your dream home. With years of combined 
            experience in home styling and design, we're dedicated to making beautiful living accessible to everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
