"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Briefcase, GraduationCap } from "lucide-react"

const Member = ({
  teamMembers,
  department,
}: {
  teamMembers: any[] // Replace 'any' with your TeamMember type
  department: string
}) => {
  const [selected, setSelected] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  // Handle window resize to detect mobile accurately
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // MOBILE VIEW
  if (isMobile) {
    return (
      <div className="mobile-container">
        {/* ADD YOUR MOBILE ELSE CODE HERE */}
        {teamMembers
              .filter((m) => m.department === department)
              .map((member) => (
                <div
                  key={member.name}
                  className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-transparent"
                >
                  <div
                    className="h-56 flex items-center justify-center text-white text-5xl font-bold relative overflow-hidden"
                    style={{ backgroundColor: "#161142" }}
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-transparent to-black opacity-20"></div>
                    <span className="relative z-10">{member.initials}</span>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{ color: "#161142" }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#B71E52" }}
                      >
                        {member.position}
                      </p>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                      {member.bio}
                    </p>

                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                      <div className="flex items-start">
                        <Briefcase
                          size={16}
                          className="mr-2.5 mt-0.5 shrink-0"
                          style={{ color: "#B71E52" }}
                        />
                        <span className="text-sm text-gray-700">
                          {member.experience}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <GraduationCap
                          size={16}
                          className="mr-2.5 mt-0.5 shrink-0"
                          style={{ color: "#B71E52" }}
                        />
                        <span className="text-sm text-gray-700">
                          {member.education}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center mb-3">
                        <Award
                          size={16}
                          className="mr-2"
                          style={{ color: "#B71E52" }}
                        />
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Expertise
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty:string, idx:number) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1.5 rounded-md bg-gray-50 text-gray-700 border border-gray-100"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
      </div>
    )
  }

  // DESKTOP VIEW (Default)
  return (
    <>
<div className="flex flex-wrap gap-12  mx-auto overflow-x-auto pb-8">
        {teamMembers
          .filter((member) => member.department === department)
          .map((member) => {
            let isSelected = selected === member.name
            return (
              <motion.div
                key={member.name}
                layout
                initial={{width: 300}}
                animate={{
                  width: isSelected?600:300,
                  backgroundColor: "#FDF2F8",
                  filter: "blur(0px)",
                  transition:{duration: 0.4, ease: "easeInOut"}
                }}
                exit={{
                  width: 300,
                  backgroundColor: "#FDF2F8",
                  filter: "blur(10px)",
                  transition:{duration: 0.4, ease: "easeInOut",delay: 0.8}
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onClick={() => setSelected(isSelected ? "" : member.name)}
                className="relative min-w-[300px] h-[600px] grow-0 shrink-0 bg-pink-50 flex items-center justify-start rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                {/* Member Image Section */}
                <motion.div
                  layout="position"
                  animate={{
                    width: isSelected ? 300 : 300,
                  }}
                  className="relative z-10 w-1/2 h-full font-bold text-lg overflow-hidden rounded-l-lg flex items-center justify-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                </motion.div>

                {/* Details Div */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, x: 100,filter: "blur(5px)" }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        x: 0,
                        filter: "blur(10px)",
                        transition:{duration: 0.3, ease: "easeInOut",delay: 0.0}
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut",delay: 0.3 }}
                      className="absolute right-0 top-0 bottom-0 w-1/2 px-5 py-3 h-full rounded-r-lg bg-pink-50 flex flex-col justify-center items-center text-gray-700"
                    >
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold mb-1" style={{ color: "#161142" }}>
                            {member.name}
                          </h3>
                          <p className="text-sm font-semibold" style={{ color: "#B71E52" }}>
                            {member.position}
                          </p>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                          {member.bio}
                        </p>

                        <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                          <div className="flex items-start">
                            <Briefcase size={16} className="mr-2.5 mt-0.5 shrink-0" style={{ color: "#B71E52" }} />
                            <span className="text-sm text-gray-700">{member.experience}</span>
                          </div>
                          <div className="flex items-start">
                            <GraduationCap size={16} className="mr-2.5 mt-0.5 shrink-0" style={{ color: "#B71E52" }} />
                            <span className="text-sm text-gray-700">{member.education}</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center mb-3">
                            <Award size={16} className="mr-2" style={{ color: "#B71E52" }} />
                            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                              Expertise
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {member.specialties.map((specialty: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-xs px-3 py-1.5 rounded-md bg-gray-50 text-gray-700 border border-gray-100"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
      </div>
    </>
  )
}

export default Member